import { useCallback, useEffect, useState } from "react";
import {
    getDocuments,
    uploadDocument,
    deleteDocument,
} from "../api/documents.api";
import { validatePdfFile } from "../utils/file.util";
import { getErrorMessage } from "../utils/error.util";

const POLL_INTERVAL_MS = 2500;

export default function useDocuments() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const hasProcessing = documents.some((doc) => doc.status === "processing");

    const load = useCallback(async () => {
        try {
            setDocuments(await getDocuments());
            setError(null);
        } catch (err) {
            setError(getErrorMessage(err, "Could not load your documents"));
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        load();
    }, [load]);

    // Poll only while something is processing
    useEffect(() => {
        if (!hasProcessing) return;

        let cancelled = false;
        let timer;

        const poll = async () => {
            try {
                const latest = await getDocuments();
                if (!cancelled) setDocuments(latest);
            } catch {
                // A failed poll is fine; the next one will retry
            }
            if (!cancelled) timer = setTimeout(poll, POLL_INTERVAL_MS);
        };

        timer = setTimeout(poll, POLL_INTERVAL_MS);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [hasProcessing]);

    const upload = useCallback(async (file, onProgress) => {
        const problem = validatePdfFile(file);
        if (problem) throw new Error(problem);

        const document = await uploadDocument(file, onProgress);
        setDocuments((prev) => [document, ...prev]);
        return document;
    }, []);

    const remove = useCallback(async (id) => {
        await deleteDocument(id);
        setDocuments((prev) => prev.filter((doc) => doc._id !== id));
    }, []);

    return { documents, loading, error, reload: load, upload, remove };
}