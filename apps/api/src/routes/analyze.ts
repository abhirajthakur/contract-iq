import { parseFile } from "#api/services/parser.js";
import { analyzeContract } from "#api/services/riskAnalyzer.js";
import { Router } from "express";
import multer from "multer";

import type { AnalyzeResponse } from "@contract-iq/types";
import type { Request, Response } from "express";

const router: Router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Only PDF and DOCX files are allowed"));
    } else {
      cb(null, true);
    }
  },
});

router.post(
  "/",
  upload.single("file"),
  async (req: Request, res: Response<AnalyzeResponse>) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, error: "No file uploaded" });
      }

      const pages = await parseFile(req.file);
      const contractAnalysis = await analyzeContract(
        pages,
        req.file.originalname,
      );

      return res.json({ success: true, data: contractAnalysis });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ success: false, error: err.message });
      }
      console.error(err);
      res.status(500).json({
        success: false,
        error: err instanceof Error ? err.message : "Internal server error",
      });
    }
  },
);

export default router;
