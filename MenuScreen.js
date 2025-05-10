import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function MenuScreen({ route, navigation }) {
  const { username } = route.params;
  const [showMessage, setShowMessage] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      {showMessage ? (
        <Text style={styles.message}>Добро пожаловать, {username}!</Text>
      ) : (
        <>
          <Text style={styles.header}>MyAdrenalin</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Контакты</Text>
          </TouchableOpacity>
          {/* Кнопка для перехода на экран дневника тренировок */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("DiaryTraining")}
          >
            <Text style={styles.buttonText}>Дневник тренировок</Text>
          </TouchableOpacity>
          {/* Кнопка для перехода на экран таймера */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CycleTimer")}
          >
            <Text style={styles.buttonText}>Таймер тренировки</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text style={styles.themeButtonText}>
          {isDarkMode ? "Светлая тема" : "Тёмная тема"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5fd1a5",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5fd1a5",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#5fd1a5",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  themeButton: {
    backgroundColor: "#ccc",
    position: "absolute",
    bottom: 20,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5fd1a5",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5fd1a5",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#5fd1a5",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  themeButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#555",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
