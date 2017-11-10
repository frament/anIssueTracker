# anIssueTracker
Экспериментальный трекер задач на основе стека Parse-server + Angular

Установка:
1. Установить nodejs - https://nodejs.org
2. Установить Parse-Server, Parse-Dashboard mongoDB, Angular CLI - `npm install -g parse-server parse-dashboard mongodb-runner @angular/cli`
3. Установить все зависимости - `npm install`

Запуск серверной составляющей:
1. Старт mongoDB - `mongodb-runner start`
2. Старт Parse-Server - `parse-server ./parse-configs/server.json`
3. Старт Parse-Dashboard - `parse-dashboard --config ./parse-configs/dashboard.json`

Набор команд:
1. Запуск клиента для разработки - `npm start`
2. Билд клиента для production - `npm run build`
3. Запуск тестов - `npm run test`
4. Запуск проверки качества когда - `npm run lint`
