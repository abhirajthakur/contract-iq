"use client";

import { AlertCircle, FileText, Loader2, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { analyzeContract } from "@/lib/api";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE_MB = 10;
const VALID_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function validateFile(file: File): string | null {
  const isValidType =
    VALID_TYPES.includes(file.type) ||
    file.name.toLowerCase().endsWith(".pdf") ||
    file.name.toLowerCase().endsWith(".docx");

  if (!isValidType) {
    return "Only PDF and DOCX files are allowed.";
  }

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return `File must be under ${MAX_FILE_SIZE_MB}MB.`;
  }

  return null;
}

export default function UploadContractForm() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (selectedFile: File) => {
    const validationError = validateFile(selectedFile);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setError(null);

    // Reset input so selecting same file again works
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError(null);

      const result = await analyzeContract(file);

      router.push(`/analysis/${encodeURIComponent(result.documentName)}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-xl mx-auto"
    >
      <label
        htmlFor="file-input"
        onDragEnter={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "relative block rounded-2xl border-2 border-dashed p-8 md:p-12 text-center transition-all duration-300 cursor-pointer",
          dragOver
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50 bg-card",
          file && "border-green-500 bg-green-50",
        )}
      >
        <input
          ref={inputRef}
          id="file-input"
          type="file"
          accept=".pdf,.docx,"
          className="sr-only"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              handleFile(selectedFile);
            }
          }}
        />

        {file ? (
          <div className="space-y-3">
            <FileText className="h-12 w-12 mx-auto text-green-600" />
            <div>
              <p className="font-semibold break-all">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemove();
              }}
              className="text-xs underline text-muted-foreground hover:text-foreground"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <p className="font-semibold">Drop your contract here</p>
              <p className="text-sm text-muted-foreground mt-1">
                PDF or DOCX • Max {MAX_FILE_SIZE_MB}MB
              </p>
            </div>
          </div>
        )}
      </label>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg p-3 border border-red-200"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </motion.div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={!file || loading}
        className="w-full mt-4 h-12 text-base font-semibold"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Analyzing Contract...
          </>
        ) : (
          "Analyze Contract"
        )}
      </Button>
    </motion.div>
  );
}
