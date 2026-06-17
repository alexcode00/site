# МеталлПрокат — сайт компании

Сайт для компании по продаже металлопроката и кровельных материалов в г. Озёры.

## Что умеет

- Каталог товаров: металлопрокат и кровельные материалы
- Форма заявки с отправкой уведомления в Telegram
- Скачать прайс-лист

## Стек

- **Бэкенд:** FastAPI + Python
- **Фронтенд:** HTML, CSS, JavaScript (ванилла)
- **Уведомления:** Telegram Bot API

## Запуск

1. Установить зависимости:
pip install -r requirements.txt
2. Создать `.env` файл:
TOKEN=токен_телеграм_бота
CHAT_ID=id_чата
3. Запустить сервер:
uvicorn main:app --reload
4. Открыть сайт: `http://localhost:8000`

## Структура
    ├── main.py          # FastAPI бэкенд

    ├── .env             # секреты 

    ├── requirements.txt

    └── site/            # фронтенд

        ├── index.html

        ├── metal.html

        ├── roof.html

        ├── css/

        ├── images/

        ├── sript-roof.js

        └── script*.js