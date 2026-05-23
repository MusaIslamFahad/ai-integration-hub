from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_template(
    "Explain this service contract in plain language: {contract}"
)

chain = prompt | llm
print(chain.invoke({"contract": "Events are eventually consistent"}).content)
