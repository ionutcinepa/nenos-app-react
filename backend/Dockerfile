FROM python:3.12-slim


WORKDIR /app

COPY . .

RUN pip3 install poetry

RUN poetry install

RUN poetry add uvicorn

EXPOSE 8000
 
CMD [ "poetry", "run", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000" ]


