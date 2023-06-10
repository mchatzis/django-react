FROM python:3.8

WORKDIR /usr/src/django-react

SHELL ["/bin/bash", "-c"]

COPY . .

# Install pip and project dependencies
RUN pip install --no-cache-dir -r requirements.txt\
        && python manage.py migrate

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

RUN npm install\
    && npm run prod

EXPOSE 5000

CMD ["python", "manage.py", "runserver", "0.0.0.0:5000"]