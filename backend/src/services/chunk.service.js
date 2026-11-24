import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 100;
const MIN_PAGE_CHARS = 30;
const MIN_CHUNK_CHARS = 20;

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: CHUNK_SIZE,
  chunkOverlap: CHUNK_OVERLAP,
});

export const chunkPages = async (pages) => {
    const chunks = [];

    for(let i = 0; i < pages.length; i++){
        if (pages[i].length < MIN_PAGE_CHARS) continue;

        const parts = await splitter.splitText(pages[i]);

        for(const part of parts){
            const text = part.trim();
            if (text.length < MIN_CHUNK_CHARS) continue;

            chunks.push({
                text,
                pageNumber: i+1,
                chunkIndex: chunks.length,
            });
        }
    }

    return chunks;
};