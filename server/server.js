const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Разрешаем доступ из всех источников
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // или укажите конкретные домены
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Для парсинга JSON в теле запроса
app.use(bodyParser.json());

// Массив пользователей (для простоты, в реальном проекте это будет база данных)
let users = [
  {
    id: 1,
    username: "admin",
    password: "1234",
  },
];

// Роут для логина
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Логируем в консоль полученные данные
  console.log(
    `Received login attempt with username: ${username} and password: ${password}`
  );

  // Находим пользователя по имени
  const user = users.find((user) => user.username === username);

  // Если пользователь не найден или пароль неверный
  if (!user) {
    return res
      .status(400)
      .json({ message: "Неверное имя пользователя или пароль" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Неверный пароль" });
  }

  // Если данные правильные
  console.log(`User ${username} successfully logged in.`);
  return res.status(200).json({ message: "Login successful" });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
