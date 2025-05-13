// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome, {{username}}!",
      diary: "Training Diary",
      timer: "Workout Timer",
      video: "Video Lessons",
    },
  },
  ru: {
    translation: {
      welcome: "Добро пожаловать, {{username}}!",
      diary: "Дневник тренировок",
      timer: "Таймер тренировки",
      video: "Видео уроки",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
