# How to run



1. Start the database server: `cd Database && docker-compose -f stack.yml up`. A UI for the database with Adminer is then viewable at http://localhost:8080

2. Start the API: `cd API && flask run`. The API runs on http://localhost:5000

3. Start the frontend: `cd frontend && npm start`. The frontend is available on http://localhost:3000



