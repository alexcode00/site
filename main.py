from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import requests
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import time
import httpx
from pydantic import BaseModel, field_validator
import re
import asyncio

load_dotenv()
app = FastAPI()

TOKEN = os.getenv("BOT_TOKEN")
CHAT_ID = os.getenv("CHAT_ID")

class FormData(BaseModel):
    name: str
    phone: str
    comment: str = ""
    product: str

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value):
        digits = re.sub(r"\D", "", value)

        if len(digits) < 10:
            raise ValueError("Телефон слишком короткий")

        return value

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # потом лучше указать домен
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/site", StaticFiles(directory="site"), name="site")


# главная страница
@app.get("/")
async def index():
    return FileResponse("site/index.html")
@app.get("/metal")
async def metal():
    return FileResponse("site/metal.html")

@app.get("/roof")
async def roof():
    return FileResponse("site/roof.html")
@app.get("/yandex_487ad58fecf9ca58.html")
async def yandex():
    return FileResponse("site/yandex_487ad58fecf9ca58.html")
@app.get("/favicon.ico")
async def favicon():
    return FileResponse("site/favicon.ico")
@app.post("/send")
async def send_message(data: FormData):
    print(f"TOKEN: {TOKEN}, CHAT_ID: {CHAT_ID}")
    comment = data.comment if data.comment else "Не указано"

    message = f"""
📩 Новая заявка!

📦 Товар: {data.product}
👤 Имя: {data.name}
📞 Телефон: {data.phone}
💬 Комментарий: {comment}
"""

    # Шлём в Telegram в фоне, не ждём
    asyncio.create_task(send_telegram(message))

    return {"status": "ok"}  # отвечаем сразу


async def send_telegram(message: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"https://morning-union-29d4.crazymortis333666.workers.dev/{TOKEN}/sendMessage",
                json={"chat_id": CHAT_ID, "text": message}
            )
    except Exception as e:
        print(f"TG error: {e}")