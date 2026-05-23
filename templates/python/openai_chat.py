import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are an API assistant."},
        {"role": "user", "content": "Summarize this architecture decision."}
    ],
    max_tokens=1024
)

print(response.choices[0].message.content)
