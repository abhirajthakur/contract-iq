import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

export async function parseFile(file: Express.Multer.File): Promise<string[]> {
  if (!file) {
    throw new Error("No file provided");
  }

  const { originalname, buffer, mimetype } = file;
  console.log({ originalname });

  try {
    let pages: string[] = [];

    if (mimetype === "application/pdf") {
      pages = await parsePDF(buffer);
    } else if (
      mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      pages = await parseDOCX(buffer);
    } else {
      throw new Error("Unsupported file type. Only PDF and DOCX are allowed.");
    }

    return pages;
  } catch (err) {
    console.error("File parsing failed:", err);
    throw new Error("Failed to parse contract file.");
  }
}

// PDF parser: splits by form feed (\f) which usually indicates new page
async function parsePDF(buffer: Buffer): Promise<string[]> {
  try {
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();

    const pages = data.text
      .split(/\f/) // form feed = new page
      .map((page) => page.replace(/\s+/g, " ").trim())
      .filter(Boolean);

    return pages;
  } catch (err) {
    console.error("PDF parse error:", err);
    throw new Error("Failed to parse PDF");
  }
}

// DOCX parser: splits by double newlines as page approximation
async function parseDOCX(buffer: Buffer): Promise<string[]> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    const pages = result.value
      .split(/\n{2,}/) // approximate page breaks
      .map((page) => page.replace(/\s+/g, " ").trim())
      .filter(Boolean);

    return pages;
  } catch (err) {
    console.error("DOCX parse error:", err);
    throw new Error("Failed to parse DOCX");
  }
}
