FROM python:3.15
WORKDIR /app
ARG REQUIREMENT_FILE

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements/ /app/requirements/

RUN config_mode=$(echo ${REQUIREMENT_FILE:-base} | rev | cut -d'.' -f1 | rev) && \
    pip install --no-cache-dir -r requirements/${config_mode}.txt
COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]