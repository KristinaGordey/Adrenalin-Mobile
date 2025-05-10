import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const loginData = { username, password };

    axios
      .post("http://localhost:5000/login", loginData) // Ваш API для логина
      .then((response) => {
        console.log("Login successful:", response.data);
        const token = response.data.token; // Получаем токен
        navigation.navigate("Menu", { username, token }); // Переходим на экран Menu
      })
      .catch((error) => {
        console.error(
          "Login error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Вход</Text>

      <TextInput
        style={styles.input}
        placeholder="Имя пользователя"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#5fd1a5",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#5fd1a5",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LoginScreen;
