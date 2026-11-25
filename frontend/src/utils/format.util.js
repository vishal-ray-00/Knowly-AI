const dateFormatter = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
});

export const formatDate = (value) => dateFormatter.format(new Date(value));

export const pluralize = (count, word) =>
    `${count} ${word}${count === 1 ? "" : "s"}`;

export const formatSize = (bytes) =>
    bytes < 1024 * 1024
        ? `${Math.max(1, Math.round(bytes / 1024))} KB`
        : `${(bytes / 1024 / 1024).toFixed(1)} MB`;