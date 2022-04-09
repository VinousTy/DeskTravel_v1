FROM python:3.9
ENV PYTHONUNBUFFERED 1
ENV APP_ROOT /code
WORKDIR ${APP_ROOT}
COPY requirements.txt ${APP_ROOT}/
RUN pip install -r requirements.txt
COPY . /code/