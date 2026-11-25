export const MAX_FILE_SIZE_MB = 10;

// Returns an error message, or null when the file is fine
export const validatePdfFile = (file) => {
    if (!file) return "Please choose a PDF file";
    if (file.type !== "application/pdf") return "Only PDF files are supported";
    if (file.size === 0) return "This file is empty";
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        return `File is too large (max ${MAX_FILE_SIZE_MB} MB)`;
    }
    return null;
};