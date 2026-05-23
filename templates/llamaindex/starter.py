from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.llms.openai import OpenAI

documents = SimpleDirectoryReader("./docs").load_data()
index = VectorStoreIndex.from_documents(documents)
engine = index.as_query_engine(llm=OpenAI(model="gpt-4o-mini"))

print(engine.query("What are the key product constraints?"))
