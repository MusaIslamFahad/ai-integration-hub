# Changelog

All notable changes to AI Integration Hub are documented here.

---

## [2.2.0] — 2025-05-23

### Fixed — Senior Engineer Audit Pass

**Critical**
- `templates/python/openai_chat.py`: replaced `"YOUR_API_KEY"` with `os.getenv("OPENAI_API_KEY")`, added `import os`
- `templates/node/openai-response.mjs`: replaced non-standard `client.responses.create()` + nonexistent `gpt-4.1-mini` with standard `chat.completions.create()` streaming pattern

**Model Updates**
- Gemini 2.0 Flash → **Gemini 2.5 Flash** ($0.30/$2.50 per MTok) — 2.0 Flash deprecated Jun 1 2026
- Gemini 1.5 Pro → **Gemini 2.5 Pro** ($1.25/$10.00 per MTok, 1M context)
- Llama 3.1 405B (rarely used) → **DeepSeek R1** ($0.55/$2.19 per MTok)
- Mixtral 8x7B (superseded) → **Mistral Small 3** ($0.10/$0.30 per MTok)

**Code Correctness**
- LlamaIndex template: removed invalid `llm` param from `VectorStoreIndex.from_documents()`, moved to `as_query_engine(llm=llm)`
- RAG Hybrid Search: replaced incorrect MMR "keyword" retriever with proper `BM25Retriever` for true hybrid search

**Docs Sync**
- `docs/API_DIRECTORY.md`: expanded from 9 → 18 providers (was missing Cohere, Mistral, DeepSeek, Perplexity, Together AI, Fireworks, Replicate, Hugging Face, Voyage AI, ElevenLabs, AssemblyAI)
- `docs/AWESOME_AI_APIS.md`: synced with README — added xAI, OpenRouter, Cerebras, DeepSeek, Claude Vision, Tooling category
- `docs/WHICH_MODEL_SHOULD_I_USE.md`: replaced generic names with specific current model names and API strings

**Polish**
- Anthropic rate limit row: changed misleading `—` to `No free tier`
- Decision tree ASCII: updated "Haiku" → "Haiku 4.5"
- Contributing commit example: `'Add some AmazingFeature'` → `'feat: add Cerebras to API directory'`
- CHANGELOG: noted Claude Haiku 3.5 retirement in v2.0.0 entry

---

## [2.1.0] — 2025-05-23

### Updated — Claude Model Names & Pricing (per official Anthropic docs)

| Old | New | Change |
|-----|-----|--------|
| Claude Sonnet 4.5 | **Claude Sonnet 4.6** | Context 200K → 1M tokens |
| Claude Opus 4 | **Claude Opus 4.7** | Context 200K → 1M · Pricing $15/$75 → $5/$25 per MTok |
| Claude Haiku 3.5 *(retired Feb 2026)* | **Claude Haiku 4.5** | Pricing $0.80/$4.00 → $1.00/$5.00 per MTok |

- API strings updated: `claude-sonnet-4-6`, `claude-opus-4-7`, `claude-haiku-4-5-20251001`
- All code templates, model comparison table, routing guides, and docs updated

---

## [2.0.0] — 2025-05-23

### Added
- Complete site redesign — dark theme with Space Mono + Syne typography, animated hero, gradient orbs, noise texture overlay
- API provider filter bar (All / Free Tier / Paid Only)
- Model type tags and provider badges in API directory table
- Cost columns (input/output per 1M tokens) in Model Comparison table
- `Which Model Should I Use?` selector with 8 use-case recommendations
- Roadmaps section with 7 structured learning paths (cards layout)
- Awesome AI APIs section expanded to 9 categories including Tooling
- Contributing CTA section with GitHub action links
- Sticky nav with scroll-aware background blur
- Stats row in hero (18+ providers, 13+ models, 5 templates, 7 roadmaps)
- Copy button on all code templates
- Prompt Engineering Guide section in README
- Security & Key Management section in README
- Rate Limits & Cost Estimation section in README
- `.github/ISSUE_TEMPLATE/` — bug report, add provider, pricing update templates
- `.github/pull_request_template.md`
- `CONTRIBUTING.md`
- `CHANGELOG.md`

### New Providers
- xAI (Grok)
- OpenRouter (100+ model unified API)
- Cerebras (ultra-fast inference)
- DeepSeek
- Perplexity
- Together AI
- Fireworks AI
- Replicate
- Hugging Face Inference
- Voyage AI
- ElevenLabs
- AssemblyAI

### Fixed
- Contact links: `yourusername` → `MusaIslamFahad`
- LangChain RAG docs URL (reorganized upstream)
- LangChain Agents docs URL (reorganized upstream)
- Mistral pricing URL: `technology/#pricing` → `mistral.ai/pricing`
- Fireworks docs: `readme.fireworks.ai` → `docs.fireworks.ai`
- Google AI Studio API key URL corrected
- TOC anchor links for Roadmaps and Prompt Engineering sections (emoji variation selector issue)
- Node.js template: replaced non-standard `client.responses.create` with `chat.completions.create` streaming

### Updated
- `claude-3-5-sonnet-20241022` → `claude-sonnet-4-6`
- `gemini-pro` (deprecated) → `gemini-2.0-flash`
- LangChain imports: `langchain.*` → `langchain_community.*` / `langchain_openai.*`
- Model table: added GPT-4.1, Claude Haiku 4.5 (replaced retired Haiku 3.5), Claude Opus 4.7, Gemini 2.0 Flash, DeepSeek V3, Grok-3, Llama 3.3 70B

---

## [1.0.0] — Initial Release

- API Directory with 6 providers
- Model Comparison table
- 5 code templates (Python, Node.js, LangChain, LlamaIndex, RAG)
- Which Model selector
- AI Engineering Roadmaps
- Awesome AI APIs (8 categories)
