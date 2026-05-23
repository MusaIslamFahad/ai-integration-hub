# Which Model Should I Use?

## Quick Reference by Goal

| Goal | Recommended Model | Provider | Why |
|------|-------------------|----------|-----|
| Chatbot / Assistant | Claude Sonnet 4.6 | Anthropic | Best conversational quality and safety |
| Fast inference | Llama 3.3 70B | Groq / Cerebras | Sub-100ms latency |
| Budget build | GPT-4o mini / Claude Haiku 4.5 | OpenAI / Anthropic | Lowest cost with good quality |
| Long context | Claude Sonnet 4.6 (1M) / Gemini 2.5 Pro (1M) | Anthropic / Google | Largest context windows |
| Vision / Multimodal | GPT-4o / Claude Sonnet 4.6 | OpenAI / Anthropic | Best image understanding |
| Code generation | Claude Sonnet 4.6 / GPT-4.1 | Anthropic / OpenAI | Top coding benchmarks |
| Research / Analysis | Claude Opus 4.7 / GPT-4o | Anthropic / OpenAI | Strongest reasoning |
| Multi-model access | Any | OpenRouter | One API key for 100+ models |
| Self-hosted | Llama 3.3 70B / Qwen 2.5 | Meta / Alibaba | Full control, no API costs |

## Practical Routing Policy

1. **Start cheap** — prototype with GPT-4o mini or Claude Haiku 4.5
2. **Route by complexity** — send simple prompts to fast/cheap models, escalate hard ones
3. **Use fallbacks** — always have a backup provider to avoid outage downtime
4. **Benchmark first** — never pick a model on specs alone; test with your actual prompts

## Model Aliases (API strings)

| Model | API String |
|-------|-----------|
| Claude Sonnet 4.6 | `claude-sonnet-4-6` |
| Claude Opus 4.7 | `claude-opus-4-7` |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` |
| GPT-4o | `gpt-4o` |
| GPT-4o mini | `gpt-4o-mini` |
| GPT-4.1 | `gpt-4.1` |
| Gemini 2.5 Pro | `gemini-2.5-pro` |
| Gemini 2.5 Flash | `gemini-2.5-flash` |
| Llama 3.3 70B (Groq) | `llama-3.3-70b-versatile` |
