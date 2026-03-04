import env from "#api/config/env.js";
import analyzeRouter from "#api/routes/analyze.js";
import cors from "cors";
import express from "express";

const app: express.Express = express();

app.use(express.json());
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

app.get("/health", (_req, res) => {
  res.status(200).send({
    status: "ok",
  });
});

app.use("/api/analyze", analyzeRouter);

export default app;
