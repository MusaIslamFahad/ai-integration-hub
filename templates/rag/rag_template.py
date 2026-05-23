"""
Minimal RAG flow template.
Replace retriever and llm with your own implementations.
"""

query = "How do we rotate keys safely?"

# 1) Retrieve relevant chunks
chunks = retriever.search(query, top_k=4)

# 2) Build grounded context
context = "\n\n".join(c.text for c in chunks)

# 3) Generate with strict grounding
answer = llm.generate(
    f"Use only this context to answer.\nContext:\n{context}\n\nQuestion: {query}"
)

print(answer)
