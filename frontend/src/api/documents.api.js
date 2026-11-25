import api from "./axios";

export const getDocuments = async () => {
    const { data } = await api.get("/documents");
    return data.documents;
};

export const getDocument = async (id) => {
    const { data } = await api.get(`/documents/${id}`);
    return data.document;
};

export const uploadDocument = async (file, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post("/documents/upload", formData, {
        onUploadProgress: (event) => {
            if (onProgress && event.total) {
                onProgress(Math.round((event.loaded / event.total) * 100));
            }
        },
    });
    return data.document;
};

export const deleteDocument = async (id) => {
    await api.delete(`/documents/${id}`);
};