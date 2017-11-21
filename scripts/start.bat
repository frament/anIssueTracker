cd ../parse-configs
start /b cmd /c mongodb-runner start
start /b cmd /c parse-server ./parse-configs/server.json
start /b cmd /c parse-dashboard --config ./parse-configs/dashboard.json
