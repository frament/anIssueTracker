cd ../parse-configs
start /b cmd /c mongodb-runner start
start /b cmd /c parse-server ./server.json
start /b cmd /c parse-dashboard --config ./dashboard.json
