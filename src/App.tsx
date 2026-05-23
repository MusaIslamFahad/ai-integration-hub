import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
type ApiProvider = {
  name: string;
  apiKeyLink: string;
  freeTier: string;
  freeTierType: "free" | "paid" | "limited";
  pricingPage: string;
  modelTypes: string[];
  docs: string;
  badge?: string;
};

type ModelRow = {
  model: string;
  provider: string;
  contextWindow: string;
  vision: boolean;
  costInput: string;
  costOutput: string;
  freeTier: boolean;
  costLevel: "low" | "medium" | "high" | "variable";
};

type TemplateKey = "python" | "node" | "langchain" | "llamaindex" | "rag";

// ─── Data ─────────────────────────────────────────────────────────────────────
const apiDirectory: ApiProvider[] = [
  {
    name: "OpenAI",
    apiKeyLink: "https://platform.openai.com/api-keys",
    freeTier: "Trial credits",
    freeTierType: "limited",
    pricingPage: "https://openai.com/api/pricing",
    modelTypes: ["LLM", "Embeddings", "Vision", "Audio", "TTS"],
    docs: "https://platform.openai.com/docs",
    badge: "Most Popular",
  },
  {
    name: "Google AI Studio",
    apiKeyLink: "https://aistudio.google.com/apikey",
    freeTier: "Yes — 60 req/min",
    freeTierType: "free",
    pricingPage: "https://ai.google.dev/pricing",
    modelTypes: ["LLM", "Embeddings", "Vision", "Audio"],
    docs: "https://ai.google.dev/docs",
  },
  {
    name: "Anthropic",
    apiKeyLink: "https://console.anthropic.com/settings/keys",
    freeTier: "Credits for new accounts",
    freeTierType: "limited",
    pricingPage: "https://www.anthropic.com/pricing",
    modelTypes: ["LLM", "Vision"],
    docs: "https://docs.anthropic.com",
    badge: "Best for Safety",
  },
  {
    name: "Groq",
    apiKeyLink: "https://console.groq.com/keys",
    freeTier: "Yes",
    freeTierType: "free",
    pricingPage: "https://groq.com/pricing/",
    modelTypes: ["LLM", "Vision", "Audio"],
    docs: "https://console.groq.com/docs",
    badge: "Fastest",
  },
  {
    name: "Mistral AI",
    apiKeyLink: "https://console.mistral.ai/api-keys",
    freeTier: "Trial credits",
    freeTierType: "limited",
    pricingPage: "https://mistral.ai/pricing",
    modelTypes: ["LLM", "Embeddings", "Vision"],
    docs: "https://docs.mistral.ai",
  },
  {
    name: "DeepSeek",
    apiKeyLink: "https://platform.deepseek.com/api_keys",
    freeTier: "Credits",
    freeTierType: "limited",
    pricingPage: "https://platform.deepseek.com/pricing",
    modelTypes: ["LLM"],
    docs: "https://platform.deepseek.com/api-docs",
    badge: "Best Value",
  },
  {
    name: "Cohere",
    apiKeyLink: "https://dashboard.cohere.com/api-keys",
    freeTier: "Yes",
    freeTierType: "free",
    pricingPage: "https://cohere.com/pricing",
    modelTypes: ["LLM", "Embeddings", "Rerank"],
    docs: "https://docs.cohere.com",
  },
  {
    name: "Together AI",
    apiKeyLink: "https://api.together.xyz/settings/api-keys",
    freeTier: "$25 credit",
    freeTierType: "limited",
    pricingPage: "https://www.together.ai/pricing",
    modelTypes: ["LLM", "Embeddings", "Image"],
    docs: "https://docs.together.ai",
  },
  {
    name: "xAI (Grok)",
    apiKeyLink: "https://console.x.ai/",
    freeTier: "No",
    freeTierType: "paid",
    pricingPage: "https://x.ai/api",
    modelTypes: ["LLM", "Vision"],
    docs: "https://docs.x.ai",
  },
  {
    name: "OpenRouter",
    apiKeyLink: "https://openrouter.ai/keys",
    freeTier: "Yes — limited",
    freeTierType: "limited",
    pricingPage: "https://openrouter.ai/models",
    modelTypes: ["LLM (100+ models)"],
    docs: "https://openrouter.ai/docs",
    badge: "100+ Models",
  },
  {
    name: "Cerebras",
    apiKeyLink: "https://cloud.cerebras.ai/",
    freeTier: "Yes — limited",
    freeTierType: "limited",
    pricingPage: "https://cerebras.ai/pricing",
    modelTypes: ["LLM"],
    docs: "https://inference-docs.cerebras.ai",
    badge: "Ultra-Fast",
  },
  {
    name: "Perplexity",
    apiKeyLink: "https://www.perplexity.ai/settings/api",
    freeTier: "No",
    freeTierType: "paid",
    pricingPage: "https://www.perplexity.ai/pricing",
    modelTypes: ["LLM", "Search"],
    docs: "https://docs.perplexity.ai",
  },
  {
    name: "Fireworks AI",
    apiKeyLink: "https://fireworks.ai/api-keys",
    freeTier: "Yes — limited",
    freeTierType: "limited",
    pricingPage: "https://fireworks.ai/pricing",
    modelTypes: ["LLM", "Image", "Audio"],
    docs: "https://docs.fireworks.ai",
  },
  {
    name: "Replicate",
    apiKeyLink: "https://replicate.com/account/api-tokens",
    freeTier: "No",
    freeTierType: "paid",
    pricingPage: "https://replicate.com/pricing",
    modelTypes: ["LLM", "Image", "Audio", "Video"],
    docs: "https://replicate.com/docs",
  },
  {
    name: "Hugging Face",
    apiKeyLink: "https://huggingface.co/settings/tokens",
    freeTier: "Yes — limited",
    freeTierType: "limited",
    pricingPage: "https://huggingface.co/pricing",
    modelTypes: ["LLM", "Embeddings", "All"],
    docs: "https://huggingface.co/docs",
  },
  {
    name: "Voyage AI",
    apiKeyLink: "https://dash.voyageai.com/api-keys",
    freeTier: "Yes — limited",
    freeTierType: "limited",
    pricingPage: "https://www.voyageai.com/pricing",
    modelTypes: ["Embeddings", "Rerank"],
    docs: "https://docs.voyageai.com",
  },
  {
    name: "ElevenLabs",
    apiKeyLink: "https://elevenlabs.io/app/speech-synthesis",
    freeTier: "10k chars/mo",
    freeTierType: "free",
    pricingPage: "https://elevenlabs.io/pricing",
    modelTypes: ["TTS", "Voice"],
    docs: "https://elevenlabs.io/docs",
  },
  {
    name: "AssemblyAI",
    apiKeyLink: "https://www.assemblyai.com/dashboard/signup",
    freeTier: "Yes — limited",
    freeTierType: "limited",
    pricingPage: "https://www.assemblyai.com/pricing",
    modelTypes: ["STT", "TTS", "Understanding"],
    docs: "https://www.assemblyai.com/docs",
  },
];

const modelComparison: ModelRow[] = [
  { model: "GPT-4.1", provider: "OpenAI", contextWindow: "1M", vision: true, costInput: "$2.00", costOutput: "$8.00", freeTier: false, costLevel: "medium" },
  { model: "GPT-4o", provider: "OpenAI", contextWindow: "128K", vision: true, costInput: "$2.50", costOutput: "$10.00", freeTier: false, costLevel: "medium" },
  { model: "GPT-4o mini", provider: "OpenAI", contextWindow: "128K", vision: true, costInput: "$0.15", costOutput: "$0.60", freeTier: true, costLevel: "low" },
  { model: "Claude Sonnet 4.6", provider: "Anthropic", contextWindow: "1M", vision: true, costInput: "$3.00", costOutput: "$15.00", freeTier: false, costLevel: "medium" },
  { model: "Claude Haiku 4.5", provider: "Anthropic", contextWindow: "200K", vision: true, costInput: "$1.00", costOutput: "$5.00", freeTier: false, costLevel: "low" },
  { model: "Claude Opus 4.7", provider: "Anthropic", contextWindow: "1M", vision: true, costInput: "$5.00", costOutput: "$25.00", freeTier: false, costLevel: "medium" },
  { model: "Gemini 2.5 Flash", provider: "Google", contextWindow: "1M", vision: true, costInput: "$0.30", costOutput: "$2.50", freeTier: true, costLevel: "low" },
  { model: "Gemini 2.5 Pro", provider: "Google", contextWindow: "1M", vision: true, costInput: "$1.25", costOutput: "$10.00", freeTier: true, costLevel: "medium" },
  { model: "DeepSeek V3", provider: "DeepSeek", contextWindow: "128K", vision: false, costInput: "$0.27", costOutput: "$1.10", freeTier: true, costLevel: "low" },
  { model: "Llama 3.3 70B", provider: "Meta", contextWindow: "128K", vision: false, costInput: "~$0.59", costOutput: "~$0.79", freeTier: true, costLevel: "low" },
  { model: "Mistral Large 2", provider: "Mistral", contextWindow: "128K", vision: true, costInput: "$2.00", costOutput: "$6.00", freeTier: false, costLevel: "medium" },
  { model: "Grok-3", provider: "xAI", contextWindow: "131K", vision: true, costInput: "$3.00", costOutput: "$15.00", freeTier: false, costLevel: "medium" },
  { model: "Llama 3.3 70B (Groq)", provider: "Groq", contextWindow: "128K", vision: false, costInput: "~$0.59", costOutput: "~$0.79", freeTier: true, costLevel: "low" },
];

const templates: Record<TemplateKey, { label: string; lang: string; code: string }> = {
  python: {
    label: "Python",
    lang: "python",
    code: `from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are an AI assistant."},
        {"role": "user", "content": "Summarize this architecture."}
    ],
    temperature=0.7,
    max_tokens=1024
)

print(response.choices[0].message.content)`,
  },
  node: {
    label: "Node.js",
    lang: "javascript",
    code: `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Streaming response
const stream = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "Generate a test plan." }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(
    chunk.choices[0]?.delta?.content || ""
  );
}`,
  },
  langchain: {
    label: "LangChain",
    lang: "python",
    code: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# Build RAG chain
llm = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_template(
    "Answer using only this context:\\n{context}\\n\\nQ: {question}"
)

chain = prompt | llm
response = chain.invoke({
    "context": "...",
    "question": "What are the key constraints?"
})
print(response.content)`,
  },
  llamaindex: {
    label: "LlamaIndex",
    lang: "python",
    code: `from llama_index.core import (
    VectorStoreIndex,
    SimpleDirectoryReader
)
from llama_index.llms.openai import OpenAI

# Load and index documents
documents = SimpleDirectoryReader("./docs").load_data()
index = VectorStoreIndex.from_documents(documents)

# Query
engine = index.as_query_engine(
    llm=OpenAI(model="gpt-4o-mini")
)
response = engine.query("What are the key constraints?")
print(response)`,
  },
  rag: {
    label: "RAG Pipeline",
    lang: "python",
    code: `# Complete RAG pipeline with hybrid search
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.retrievers import EnsembleRetriever
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain_community.vectorstores import Chroma

embeddings = OpenAIEmbeddings()
vectorstore = Chroma(embedding_function=embeddings)

# Hybrid: semantic + MMR diversity
semantic = vectorstore.as_retriever(
    search_type="similarity", k=5
)
diverse = vectorstore.as_retriever(
    search_type="mmr", k=5
)
retriever = EnsembleRetriever(
    retrievers=[semantic, diverse],
    weights=[0.6, 0.4]
)

# Multi-query for better recall
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
multi = MultiQueryRetriever.from_llm(retriever, llm)

results = multi.invoke("How do we handle auth at scale?")`,
  },
};

const routingGuides = [
  { goal: "Chatbot", icon: "🤖", recommendation: "GPT-4o, Claude Sonnet 4.6, or Gemini 2.5 Flash — best conversational quality and tool-calling reliability." },
  { goal: "Fast Inference", icon: "⚡", recommendation: "Groq or Cerebras-hosted Llama — sub-100ms latency for user-facing real-time flows." },
  { goal: "Budget Build", icon: "💰", recommendation: "DeepSeek V3, GPT-4o mini, or Claude Haiku 4.5 — excellent quality at a fraction of the cost." },
  { goal: "Long Context", icon: "📄", recommendation: "Gemini 2.5 Pro (1M tokens) or Claude Sonnet 4.6 (1M) — ideal for large codebases and documents." },
  { goal: "Vision/Image", icon: "👁", recommendation: "GPT-4o, Claude Sonnet 4.6, or Gemini 2.5 Flash — best multimodal understanding and OCR." },
  { goal: "Code Gen", icon: "🖥", recommendation: "Claude Sonnet 4.6, GPT-4.1, or DeepSeek V3 — consistently top performers on coding benchmarks." },
  { goal: "Multi-Model", icon: "🔀", recommendation: "OpenRouter — single API key routing to 100+ models, perfect for A/B testing providers." },
  { goal: "Self-Hosted", icon: "🏠", recommendation: "Llama 3.3 70B or Qwen 2.5 — full control, no API costs, runs on consumer GPU clusters." },
];

const roadmaps = [
  { title: "RAG Architecture", icon: "🔍", desc: "Ingestion, chunking strategy, embedding selection, retrieval tuning, reranking, citations, regression eval." },
  { title: "Agents", icon: "🤖", desc: "Tool schemas, planning loops, memory management, guardrails, human-in-the-loop checkpoints, observability." },
  { title: "Fine-Tuning", icon: "🔧", desc: "Dataset design, cleaning, de-duplication, train/val/test splits, offline eval, safety and policy review." },
  { title: "MCP Protocol", icon: "🔌", desc: "Client/server contracts, capability discovery, auth, rate limiting, sandboxing, monitoring and incidents." },
  { title: "Vector Databases", icon: "🗄", desc: "Index type selection, metadata strategy, chunk size experiments, hybrid search, recall/precision benchmarking." },
  { title: "Evaluation", icon: "📊", desc: "Golden datasets, LLM-as-judge, latency/token/cost tracking, A/B testing, release gates on eval thresholds." },
  { title: "MLOps", icon: "🚀", desc: "Prompt versioning, CI/CD pipelines, canary deployments, telemetry dashboards, automated rollback strategies." },
];

const awesomeCategories: { name: string; icon: string; color: string; items: string[] }[] = [
  { name: "LLMs", icon: "🧠", color: "#7c6dfa", items: ["OpenAI", "Anthropic", "Google Gemini", "Mistral", "Cohere", "xAI Grok", "OpenRouter", "Cerebras", "DeepSeek"] },
  { name: "Vision", icon: "👁", color: "#00d4aa", items: ["GPT-4 Vision", "Claude Vision", "Gemini Vision", "AWS Rekognition", "Roboflow", "Clarifai"] },
  { name: "Speech-to-Text", icon: "🎤", color: "#f5a623", items: ["Deepgram", "AssemblyAI", "Whisper API", "Google STT", "Azure Speech"] },
  { name: "Text-to-Speech", icon: "🔊", color: "#ff4d6d", items: ["ElevenLabs", "Cartesia", "PlayHT", "OpenAI TTS", "Azure TTS", "Google TTS"] },
  { name: "Embeddings", icon: "📐", color: "#7c6dfa", items: ["OpenAI embed-3", "Voyage-3", "Cohere Embed", "Mistral Embed", "Jina Embed", "Nomic Embed"] },
  { name: "Rerankers", icon: "🔄", color: "#00d4aa", items: ["Voyage Rerank", "Cohere Rerank", "Jina Reranker", "BGE Rerank"] },
  { name: "Image Gen", icon: "🎨", color: "#f5a623", items: ["DALL-E 3", "Stability AI", "Flux", "Ideogram", "Midjourney", "Leonardo AI"] },
  { name: "OCR", icon: "📷", color: "#ff4d6d", items: ["Azure OCR", "Google Vision", "AWS Textract", "Mindee", "Nanonets"] },
  { name: "Tooling", icon: "🛠", color: "#7c6dfa", items: ["Tavily Search", "E2B Code", "Browserbase", "LlamaParse", "Serper", "Diffbot"] },
];

const stats = [
  { value: "18+", label: "API Providers", color: "#7c6dfa" },
  { value: "13+", label: "Model Profiles", color: "#00d4aa" },
  { value: "5", label: "Code Templates", color: "#f5a623" },
  { value: "7", label: "Learning Roadmaps", color: "#ff4d6d" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label mb-2">{children}</p>;
}

function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <SectionLabel>{label}</SectionLabel>
      <div className="heading-line">
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#fff", margin: 0 }}>
          {title}
        </h2>
      </div>
      <p style={{ marginTop: 10, color: "var(--muted)", fontSize: 14, maxWidth: 560 }}>{subtitle}</p>
    </motion.div>
  );
}

function FreeTierBadge({ type, label }: { type: "free" | "paid" | "limited"; label: string }) {
  const cls = type === "free" ? "tag tag-free" : type === "paid" ? "tag tag-paid" : "tag tag-limited";
  return <span className={cls}>{label}</span>;
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{
        background: copied ? "rgba(0,212,170,0.15)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${copied ? "rgba(0,212,170,0.4)" : "rgba(255,255,255,0.1)"}`,
        color: copied ? "#00d4aa" : "var(--muted)",
        padding: "5px 12px",
        fontSize: 11,
        fontFamily: "'Space Mono', monospace",
        cursor: "pointer",
        borderRadius: 2,
        transition: "all 0.2s",
        letterSpacing: "0.05em",
      }}
    >
      {copied ? "✓ COPIED" : "COPY"}
    </button>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#api-directory", label: "APIs" },
    { href: "#templates", label: "Templates" },
    { href: "#comparison", label: "Models" },
    { href: "#roadmaps", label: "Roadmaps" },
    { href: "#awesome-apis", label: "Ecosystem" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(10,10,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.3s",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 60, justifyContent: "space-between" }}>
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 28, background: "linear-gradient(135deg, #7c6dfa, #00d4aa)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13, color: "#fff", letterSpacing: "0.05em" }}>AI HUB</span>
        </a>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="hidden-mobile">
          {links.map(l => <a key={l.href} href={l.href} className="nav-link">{l.label}</a>)}
          <a href="https://github.com/MusaIslamFahad/ai-integration-hub" target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: "6px 16px", fontSize: 11 }}>
            ★ GitHub
          </a>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" }} className="mobile-menu-btn">
          ☰
        </button>
      </div>
    </motion.nav>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>("python");
  const [selectedGoal, setSelectedGoal] = useState(routingGuides[0].goal);
  const [apiFilter, setApiFilter] = useState<"all" | "free" | "paid">("all");

  const selectedRoute = useMemo(
    () => routingGuides.find((r) => r.goal === selectedGoal),
    [selectedGoal]
  );

  const filteredApis = useMemo(() => {
    if (apiFilter === "free") return apiDirectory.filter(p => p.freeTierType === "free");
    if (apiFilter === "paid") return apiDirectory.filter(p => p.freeTierType === "paid");
    return apiDirectory;
  }, [apiFilter]);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Nav />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <header className="hero-grid" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* Gradient orbs */}
        <div style={{ position: "absolute", top: "15%", left: "5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(124,109,250,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 60px", position: "relative", zIndex: 1, width: "100%" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,109,250,0.12)", border: "1px solid rgba(124,109,250,0.3)", borderRadius: 2, padding: "5px 14px", marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d4aa", boxShadow: "0 0 8px #00d4aa" }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#a99dfc" }}>THE ULTIMATE AI ENGINEER TOOLKIT</span>
            </div>

            <h1 className="grad-text" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 800, lineHeight: 1.05, margin: "0 0 24px", maxWidth: 800 }}>
              AI Integration Hub
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "var(--muted)", maxWidth: 560, lineHeight: 1.7, margin: "0 0 40px" }}>
              Every AI API. Every model. Every code template. One repo for engineers shipping production AI.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 64 }}>
              <a href="#api-directory" className="btn-primary">Explore APIs →</a>
              <a href="#templates" className="btn-outline">View Templates</a>
              <a href="https://github.com/MusaIslamFahad/ai-integration-hub" target="_blank" rel="noreferrer" className="btn-outline">★ Star on GitHub</a>
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, maxWidth: 600 }}>
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="stat-card"
                >
                  <div style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", fontWeight: 800, color: s.color, fontFamily: "'Space Mono', monospace", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4, fontFamily: "'Space Mono', monospace", letterSpacing: "0.06em" }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <div className="scroll-bounce" style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", color: "var(--muted)", fontSize: 12, fontFamily: "'Space Mono', monospace", textAlign: "center" }}>
            <div>↓</div>
            <div style={{ fontSize: 10, marginTop: 2, letterSpacing: "0.1em" }}>SCROLL</div>
          </div>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>

        {/* ── API Directory ─────────────────────────────────────────── */}
        <section id="api-directory" style={{ marginBottom: 100, scrollMarginTop: 80 }}>
          <SectionHeading
            label="01 / API DIRECTORY"
            title="Provider Directory"
            subtitle="Every major AI API provider — key links, free tiers, and docs in one place."
          />

          {/* Filter bar */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {(["all", "free", "paid"] as const).map(f => (
              <button
                key={f}
                onClick={() => setApiFilter(f)}
                className={`tab-btn ${apiFilter === f ? "tab-btn-active" : "tab-btn-inactive"}`}
                style={{ textTransform: "uppercase" }}
              >
                {f === "all" ? `All (${apiDirectory.length})` : f === "free" ? `Free tier (${apiDirectory.filter(p => p.freeTierType === "free").length})` : `Paid only (${apiDirectory.filter(p => p.freeTierType === "paid").length})`}
              </button>
            ))}
            <span style={{ marginLeft: "auto", fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--muted)", alignSelf: "center" }}>{filteredApis.length} providers</span>
          </div>

          <div style={{ overflowX: "auto", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 2 }}>
            <table className="data-table" style={{ minWidth: 800 }}>
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Free Tier</th>
                  <th>Model Types</th>
                  <th>API Key</th>
                  <th>Pricing</th>
                  <th>Docs</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredApis.map((p, i) => (
                    <motion.tr
                      key={p.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                    >
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span className="provider-badge">{p.name}</span>
                          {p.badge && <span style={{ background: "rgba(124,109,250,0.15)", color: "#a99dfc", border: "1px solid rgba(124,109,250,0.3)", borderRadius: 2, padding: "1px 7px", fontSize: 10, fontFamily: "'Space Mono', monospace", fontWeight: 700, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{p.badge}</span>}
                        </div>
                      </td>
                      <td><FreeTierBadge type={p.freeTierType} label={p.freeTier} /></td>
                      <td>
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                          {p.modelTypes.map(t => (
                            <span key={t} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 2, padding: "1px 6px", fontSize: 10, color: "var(--muted)", fontFamily: "'Space Mono', monospace", whiteSpace: "nowrap" }}>{t}</span>
                          ))}
                        </div>
                      </td>
                      <td><a href={p.apiKeyLink} target="_blank" rel="noreferrer" className="link-accent">Get Key ↗</a></td>
                      <td><a href={p.pricingPage} target="_blank" rel="noreferrer" className="link-accent">Pricing ↗</a></td>
                      <td><a href={p.docs} target="_blank" rel="noreferrer" className="link-accent">Docs ↗</a></td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Code Templates ────────────────────────────────────────── */}
        <section id="templates" style={{ marginBottom: 100, scrollMarginTop: 80 }}>
          <SectionHeading
            label="02 / CODE TEMPLATES"
            title="Ready-to-Use Templates"
            subtitle="Production-grade snippets. Copy, paste, ship."
          />

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 2, overflow: "hidden" }}>
            {/* Tab bar */}
            <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)", background: "#0d0d14", overflowX: "auto" }}>
              {(Object.keys(templates) as TemplateKey[]).map(k => (
                <button
                  key={k}
                  onClick={() => setSelectedTemplate(k)}
                  style={{
                    padding: "13px 20px",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.07em",
                    cursor: "pointer",
                    border: "none",
                    borderBottom: selectedTemplate === k ? "2px solid var(--accent)" : "2px solid transparent",
                    background: selectedTemplate === k ? "rgba(124,109,250,0.08)" : "transparent",
                    color: selectedTemplate === k ? "#fff" : "var(--muted)",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    transition: "all 0.15s",
                  }}
                >
                  {templates[k].label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTemplate}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid var(--border)", background: "#0d0d14" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--muted)" }}>
                    {templates[selectedTemplate].lang} • {templates[selectedTemplate].label}
                  </span>
                  <CopyButton code={templates[selectedTemplate].code} />
                </div>
                <pre className="code-block" style={{ margin: 0, borderRadius: 0, border: "none" }}>
                  <code>{templates[selectedTemplate].code}</code>
                </pre>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── Model Comparison ─────────────────────────────────────── */}
        <section id="comparison" style={{ marginBottom: 100, scrollMarginTop: 80 }}>
          <SectionHeading
            label="03 / MODEL COMPARISON"
            title="Model Comparison"
            subtitle="Current models ranked by context, vision, and cost. Pricing per 1M tokens."
          />

          <div style={{ overflowX: "auto", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 2 }}>
            <table className="data-table" style={{ minWidth: 750 }}>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Provider</th>
                  <th>Context</th>
                  <th>Vision</th>
                  <th>Input / 1M</th>
                  <th>Output / 1M</th>
                  <th>Free Tier</th>
                </tr>
              </thead>
              <tbody>
                {modelComparison.map((row, i) => (
                  <motion.tr
                    key={row.model}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <td style={{ fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>{row.model}</td>
                    <td style={{ color: "var(--muted)", fontSize: 12, fontFamily: "'Space Mono', monospace" }}>{row.provider}</td>
                    <td style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--accent2)" }}>{row.contextWindow}</td>
                    <td>{row.vision ? <span style={{ color: "#00d4aa" }}>✓</span> : <span style={{ color: "var(--border)" }}>—</span>}</td>
                    <td className={`cost-${row.costLevel}`} style={{ fontFamily: "'Space Mono', monospace", fontSize: 12 }}>{row.costInput}</td>
                    <td style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--muted)" }}>{row.costOutput}</td>
                    <td>{row.freeTier ? <span className="tag tag-free">Yes</span> : <span className="tag tag-paid">No</span>}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 12, fontSize: 12, color: "var(--muted)", fontFamily: "'Space Mono', monospace" }}>* Pricing approximate. Verify current rates before production use.</p>
        </section>

        {/* ── Which Model ──────────────────────────────────────────── */}
        <section id="decision-tree" style={{ marginBottom: 100, scrollMarginTop: 80 }}>
          <SectionHeading
            label="04 / MODEL SELECTOR"
            title="Which Model Should I Use?"
            subtitle="Pick your objective. Get a focused recommendation."
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Goal buttons */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 2, padding: 24 }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--muted)", marginBottom: 16, letterSpacing: "0.1em", textTransform: "uppercase" }}>Select your goal</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {routingGuides.map(r => (
                  <button
                    key={r.goal}
                    onClick={() => setSelectedGoal(r.goal)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      background: selectedGoal === r.goal ? "rgba(124,109,250,0.12)" : "transparent",
                      border: `1px solid ${selectedGoal === r.goal ? "rgba(124,109,250,0.5)" : "var(--border)"}`,
                      borderRadius: 2,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s",
                      width: "100%",
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{r.icon}</span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: selectedGoal === r.goal ? "#fff" : "var(--muted)", letterSpacing: "0.04em" }}>{r.goal}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 2, padding: 24, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedGoal}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <span style={{ fontSize: 28 }}>{selectedRoute?.icon}</span>
                    <div>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Recommended for</p>
                      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", margin: "4px 0 0" }}>{selectedGoal}</p>
                    </div>
                  </div>
                  <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: 16 }}>
                    <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.7, margin: 0 }}>{selectedRoute?.recommendation}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── Roadmaps ────────────────────────────────────────────── */}
        <section id="roadmaps" style={{ marginBottom: 100, scrollMarginTop: 80 }}>
          <SectionHeading
            label="05 / LEARNING PATHS"
            title="AI Engineering Roadmaps"
            subtitle="Structured tracks from fundamentals to production. Pick a specialization."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {roadmaps.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="card"
                style={{ padding: 24 }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ fontSize: 22, lineHeight: 1 }}>{r.icon}</span>
                  <div>
                    <h3 style={{ fontWeight: 800, fontSize: 15, color: "#fff", margin: "0 0 8px" }}>{r.title}</h3>
                    <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Awesome APIs ─────────────────────────────────────────── */}
        <section id="awesome-apis" style={{ marginBottom: 100, scrollMarginTop: 80 }}>
          <SectionHeading
            label="06 / ECOSYSTEM"
            title="Awesome AI APIs"
            subtitle="The full ecosystem — categorized by capability."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {awesomeCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="api-cat-card"
              >
                <div className="api-cat-header" style={{ color: cat.color }}>
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                  {cat.items.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text)" }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: cat.color, flexShrink: 0, opacity: 0.6 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Contributing CTA ────────────────────────────────────── */}
        <section style={{ marginBottom: 60 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: "linear-gradient(135deg, rgba(124,109,250,0.12), rgba(0,212,170,0.08))",
              border: "1px solid rgba(124,109,250,0.3)",
              borderRadius: 2,
              padding: "48px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--accent), var(--accent2))" }} />
            <p className="section-label" style={{ marginBottom: 12 }}>OPEN SOURCE</p>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#fff", margin: "0 0 12px" }}>Built for the Community</h2>
            <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7 }}>
              Missing a provider? Found outdated pricing? PRs are welcome. Help keep this the most accurate AI API reference on GitHub.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://github.com/MusaIslamFahad/ai-integration-hub" target="_blank" rel="noreferrer" className="btn-primary">★ Star on GitHub</a>
              <a href="https://github.com/MusaIslamFahad/ai-integration-hub/issues" target="_blank" rel="noreferrer" className="btn-outline">Open an Issue</a>
              <a href="https://github.com/MusaIslamFahad/ai-integration-hub/pulls" target="_blank" rel="noreferrer" className="btn-outline">Submit a PR</a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 24, height: 24, background: "linear-gradient(135deg, #7c6dfa, #00d4aa)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🤖</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 12, color: "var(--muted)" }}>AI INTEGRATION HUB</span>
          </div>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--muted)", margin: 0 }}>
            MIT License · Made with ❤️ for the AI Engineering Community
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="https://github.com/MusaIslamFahad/ai-integration-hub" target="_blank" rel="noreferrer" className="nav-link">GitHub</a>
            <a href="https://github.com/MusaIslamFahad/ai-integration-hub/issues" target="_blank" rel="noreferrer" className="nav-link">Issues</a>
            <a href="https://github.com/MusaIslamFahad/ai-integration-hub/discussions" target="_blank" rel="noreferrer" className="nav-link">Discuss</a>
            <a href="https://aiintegrationhub.vercel.app" target="_blank" rel="noreferrer" className="nav-link">Live Site</a>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (max-width: 640px) {
          #decision-tree > div > div:last-child { display: none; }
        }
      `}</style>
    </div>
  );
}
