import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";

export default function MenuScreen({ route, navigation }) {
  const { username, userId } = route.params || {};
  console.log("userId из MenuScreen:", userId);

  const [showMessage, setShowMessage] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t, i18n } = useTranslation(); // используем useTranslation

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "ru" ? "en" : "ru";
    i18n.changeLanguage(newLang);
  };

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <ImageBackground
      source={
        isDarkMode ? require("./assets/dark.jpg") : require("./assets/lite.jpg")
      }
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {showMessage ? (
          <Text style={styles.message}>{t("welcome", { username })}</Text>
        ) : (
          <>
            <Image source={require("./assets/zip.png")} style={styles.logo} />
            <Text style={styles.header}>MyAdrenalin</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("DiaryTraining", { userId })}
            >
              <Text style={styles.buttonText}>{t("diary")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("CycleTimer")}
            >
              <Text style={styles.buttonText}>{t("timer")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("VideoExample")}
            >
              <Text style={styles.buttonText}>{t("video")}</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Image
            source={
              isDarkMode
                ? require("./assets/sun.png")
                : require("./assets/moon.png")
            }
            style={styles.themeButtonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={toggleLanguage}
        >
          <Text style={styles.languageButtonText}>
            {i18n.language === "ru" ? "EN" : "RU"}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
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
    backgroundColor: "transparent",
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
  themeButtonImage: {
    width: 30,
    height: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  languageButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#5fd1a5",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },

  languageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1, // гарантируем, что контейнер занимает всю доступную высоту
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
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
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  themeButtonImage: {
    width: 30,
    height: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  languageButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#5fd1a5",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },

  languageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
