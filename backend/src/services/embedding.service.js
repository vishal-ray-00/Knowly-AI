import gemini, {
    EMBEDDING_MODEL,
    EMBEDDING_DIMENSIONS,
} from "../config/gemini.config.js";

const BATCH_SIZE = 20;
const MAX_ATTEMPTS = 4;
const RETRYABLE_STATUS = [429, 500, 503];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Scale a vector to length 1 (direction stays the same)
const normalize = (vector) => {
    const magnitude = Math.sqrt(
        vector.reduce((sum, value) => sum + value * value, 0)
    );
    return magnitude === 0 ? vector : vector.map((value) => value / magnitude);
};

const isRetryable = (error) =>
    RETRYABLE_STATUS.includes(error.status) ||
    /RESOURCE_EXHAUSTED|UNAVAILABLE/.test(error.message || "");

const embedBatch = async (texts, taskType) => {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            const response = await gemini.models.embedContent({
                model: EMBEDDING_MODEL,
                contents: texts,
                config: {
                    taskType,
                    outputDimensionality: EMBEDDING_DIMENSIONS,
                },
            });

            const vectors = response.embeddings?.map((e) => e.values) ?? [];
            const valid =
                vectors.length === texts.length &&
                vectors.every((v) => v?.length === EMBEDDING_DIMENSIONS);
            if (!valid) {
                throw new Error("Embedding response did not match the request");
            }

            return vectors.map(normalize);
        } catch (error) {
            if (!isRetryable(error)) throw error;

            if (attempt === MAX_ATTEMPTS) {
                throw Object.assign(error, {
                    userMessage:
                        "The AI service is busy right now. Please try again in a few minutes.",
                });
            }

            const delay = 1000 * 2 ** (attempt - 1);
            console.warn(
                `Embedding attempt ${attempt} failed (${error.status ?? error.message}). Retrying in ${delay}ms`
            );
            await sleep(delay);
        }
    }
};

// For chunks being stored. Batches run one after another, on purpose,
// to stay within free-tier rate limits.
export const embedDocuments = async (texts) => {
    const vectors = [];

    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
        const batch = texts.slice(i, i + BATCH_SIZE);
        vectors.push(...(await embedBatch(batch, "RETRIEVAL_DOCUMENT")));
    }

    return vectors;
};

// For the user's question
export const embedQuery = async (text) => {
    const [vector] = await embedBatch([text], "RETRIEVAL_QUERY");
    return vector;
};