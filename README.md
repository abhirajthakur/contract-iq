# ContractIQ

AI-powered contract risk analysis. Upload a PDF or DOCX contract and get instant clause-by-clause risk scoring, summaries, and negotiation tips — powered by Google Gemini.

## Demo

https://github.com/user-attachments/assets/9aaebafb-de10-434c-8840-0177ac60ff7d

## Architecture

Turborepo monorepo with three layers:

```
packages/types        →  Shared TypeScript types (RiskClause, ContractAnalysis, API responses)
       ↕                        consumed by both ↓
apps/api              →  Express backend: file parsing, Gemini AI analysis, Zod validation
apps/web              →  Next.js frontend: upload form, analysis dashboard, clause filtering
```

### packages/types

Shared type definitions used by both the API and web app:

- `contract.ts` — `RiskClause`, `ContractAnalysis`, `RiskLevel` constants
- `api.ts` — `AnalyzeResponse` (success/error union type)

### apps/api

Express 5 backend with:

- **File parsing** — PDF (`pdf-parse`) and DOCX (`mammoth`) text extraction
- **AI analysis** — Per-page contract analysis via Gemini (`@google/genai`) with structured JSON output
- **Validation** — Zod schemas that reference `@contract-iq/types` for type-safe response validation
- **Routes** — `POST /api/analyze` accepts multipart file upload (max 10MB, PDF/DOCX only)

### apps/web

Next.js 16 frontend with:

- **Upload page** (`/`) — Drag-and-drop file upload with validation
- **Analysis page** (`/analysis/[documentName]`) — Risk score summary, clause cards with search and risk-level filtering
- **Components** — `ClauseCard`, `ClauseList`, `ContractSummary`, `RiskBadge`, `UploadContractForm`
- **UI** — Tailwind CSS 4, shadcn/ui, Framer Motion animations, Biome for linting

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm 9
- A [Google Gemini API key](https://aistudio.google.com/apikey)

### Setup

```bash
# Install dependencies
pnpm install

# Configure the API
cp apps/api/.env.example apps/api/.env
# Add your GEMINI_API_KEY to apps/api/.env
```

#### Environment Variables (`apps/api/.env`)

| Variable | Default | Description |
|---|---|---|
| `GEMINI_API_KEY` | — | Required. Google Gemini API key |
| `PORT` | `8000` | API server port |
| `FRONTEND_URL` | `http://localhost:3000` | CORS allowed origin |
| `NODE_ENV` | `development` | Environment mode |

### Development

```bash
# Run everything (API + Web)
pnpm dev

# Run individually
pnpm dev --filter=@contract-iq/api
pnpm dev --filter=web
```

### Build

```bash
pnpm build
```

### Project Commands

```bash
pnpm dev          # Start all apps in dev mode
pnpm build        # Build all apps and packages
pnpm start        # Start production servers
pnpm lint         # Lint all packages
pnpm check-types  # TypeScript type checking
pnpm format       # Prettier formatting
```

## Tech Stack

- **Monorepo** — Turborepo + pnpm workspaces
- **API** — Express 5, Zod 4, Multer, pdf-parse, Mammoth
- **AI** — Google Gemini (gemini-3-flash-preview)
- **Frontend** — Next.js 16, React 19, Tailwind CSS 4, shadcn/ui, Framer Motion
- **Tooling** — TypeScript 5.9, Biome, ESLint, Prettier
