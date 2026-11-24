import pdfParse from "pdf-parse/lib/pdf-parse.js";

const cleanText = (text) =>
    text.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();

// Returns the text of every page separately, so each chunk can cite its page.
export const extractPages = async (buffer) => {
    const pages = [];

    const renderPage = async (pageData) => {
        const content = await pageData.getTextContent({
            normalizeWhitespace: true,
        });

        let lastY;
        let text = "";
        for (const item of content.items) {
            text +=
                lastY === undefined || lastY === item.transform[5]
                    ? item.str
                    : `\n${item.str}`;
            lastY = item.transform[5];
        }

        pages.push(cleanText(text));
        return text;
    };

    const data = await pdfParse(buffer, { pagerender: renderPage });
    return { numPages: data.numpages, pages };
};