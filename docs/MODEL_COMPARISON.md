# 📊 Full Model Comparison (Updated May 2026)

**Last Updated:** May 24, 2026

This table compares the major frontier and value LLMs available via API. Pricing is per **1M tokens** (standard rates). Always verify on official provider pages.

## Flagship Models Comparison

| Model                        | Provider     | Context Window      | Input ($/1M) | Output ($/1M) | Speed (tok/s) | Benchmark Score | Strengths                              | Best For                          |
|-----------------------------|--------------|---------------------|--------------|---------------|---------------|-----------------|----------------------------------------|-----------------------------------|
| **GPT-5.4**                 | OpenAI      | 272K (1M opt-in)   | $2.50       | $15.00       | ~110         | 88–92%         | Balanced, reliable coding & agents    | General production, tools         |
| **GPT-5**                   | OpenAI      | 400K               | $1.25       | $10.00       | ~95          | 86–90%         | Strong reasoning                      | Versatile daily use               |
| **Claude Sonnet 4.6**       | Anthropic   | 1M                 | $3.00       | $15.00       | ~80–100      | 89–93%         | Superior reasoning & coding           | Complex tasks, long documents     |
| **Claude Opus 4.7**         | Anthropic   | 1M                 | $5.00       | $25.00       | ~55–75       | 91–94%         | Deepest analysis & intelligence       | Research, hard reasoning          |
| **Gemini 2.5 Pro**          | Google      | 1M (2M soon)       | $1.25       | $10.00       | ~120–150     | 88–92%         | Massive context, multimodal           | Long docs, research, vision       |
| **Grok 4.3**                | xAI         | 1M                 | $1.25       | $2.50        | ~130–160     | 85–90%         | Real-time knowledge, efficiency       | Cost-effective, creative, agents  |
| **Grok 4**                  | xAI         | 256K–2M            | $3.00       | $15.00       | ~100         | 88–91%         | High capability                       | Premium workloads                 |

## Value & Open-Source Friendly Models

| Model                        | Provider     | Context Window | Input ($/1M) | Output ($/1M) | Speed (tok/s) | Benchmark Score | Strengths                          | Best For                     |
|-----------------------------|--------------|----------------|--------------|---------------|---------------|-----------------|------------------------------------|------------------------------|
| **DeepSeek V4 Pro**         | DeepSeek    | 128K–1M       | $0.43–1.74  | $0.87–3.48   | ~140–180     | 84–89%         | Exceptional coding & math         | Cost-sensitive coding        |
| **Mistral Large 3**         | Mistral     | 256K          | $0.50       | $1.50        | ~110–140     | 82–87%         | Strong efficiency                 | European data, speed         |
| **Llama 4 Scout**           | Meta        | 10M           | ~$0.11*     | ~$0.34*      | 200+ (self-hosted) | 80–86%     | Massive context (self-hosted)     | Long-context RAG             |



## Quick Decision Guide

- **Best Overall Balance** → **Claude Sonnet 4.6** or **GPT-5.4**
- **Best Value (Price/Performance)** → **Gemini 2.5 Pro** or **Grok 4.3**
- **Best for Coding** → **Claude Sonnet 4.6** / **DeepSeek V4 Pro**
- **Best for Speed** → **Grok 4.3** or **Gemini 2.5 Pro**
- **Best for Long Context** → **Gemini 2.5 Pro** or **Llama 4 Scout**
- **Best Raw Intelligence** → **Claude Opus 4.7**

### Important Notes
- **Speed**: Measured in output tokens per second. Faster models are better for real-time apps and high-volume use.
- **Benchmarks**: Composite range based on MMLU-Pro, GPQA, SWE-Bench, and Arena Elo. Higher % = stronger general capability.
- **Prompt Caching**: Can reduce input costs by 75-90% on supported models.
- **Tiered Pricing**: Long contexts (>200K) often cost more.
- **Batch API**: Usually 50% cheaper for non-real-time workloads.

