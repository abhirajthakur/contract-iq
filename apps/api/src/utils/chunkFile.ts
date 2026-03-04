export function chunkFile(text: string, chunkSize = 2000): string[] {
  const sentences = text.split(/(?<=[.?!])\s+/); // split by sentence
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + " " + sentence).length > chunkSize) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current += " " + sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());

  return chunks;
}
