const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const User = require("./models/User");
const Training = require("./models/Training");

const app = express();
const PORT = 5000;

connectDB();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  //console.log(
  // `Received login attempt with username: ${username} and password: ${password}`
  //);
  console.log("User found:", user);

  //const user = users.find((user) => user.username === username);

  if (!user || user.password !== password) {
    return res
      .status(400)
      .json({ message: "Неверное имя пользователя или пароль" });
  }

  console.log(`User ${username} successfully logged in.`);
  return res.status(200).json({
    message: "Login successful",
    userId: user._id.toString(),
    username: user.username,
  });
});

app.post("/register", async (req, res) => {
  console.log("Received a register request:", req.body);
  const { username, password } = req.body;

  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(400).json({ message: "Пользователь уже существует" });
  }

  const newUser = new User({ username, password });
  await newUser.save();

  return res.status(201).json({ message: "Пользователь создан" });
});
app.post("/training", async (req, res) => {
  const { userId, type, duration, intensity, review } = req.body;

  try {
    const training = new Training({
      user: userId,
      type,
      duration,
      intensity,
      review,
    });

    await training.save();

    res.status(201).json({ message: "Тренировка добавлена!" });
  } catch (error) {
    console.error("Error saving training:", error);
    res.status(500).json({ message: "Ошибка при добавлении тренировки" });
  }
});
app.get("/training/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const trainings = await Training.find({ user: userId }).exec();

    res.status(200).json(trainings);
  } catch (error) {
    console.error("Error fetching trainings:", error);
    res.status(500).json({ message: "Ошибка при получении тренировок" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
