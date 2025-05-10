import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

const trainingTypes = [
  "Кардиотренировка",
  "Силовая тренировка",
  "Функциональная тренировка",
  "Пилатес",
  "Йога",
  "Кроссфит",
  "Стретчинг",
  "Калистеника",
  "Тренировка на выносливость",
  "Интервальная тренировка",
  "Гиревой спорт",
  "Аэробика",
  "Тренировка с собственным весом",
  "TRX",
  "Сайклинг",
  "Плавание",
  "Бег",
  "Спортивная ходьба",
  "Скалолазание",
  "Боевое искусство",
  "Бокс",
  "Тайский бокс",
  "Джиу-джитсу",
  "Дзюдо",
  "Каратэ",
  "Танец",
  "Степ-аэробика",
  "Барре-фитнес",
  "Тренировка с эластичной лентой",
  "Упражнение на баланс",
  "Упражнение для кора",
  "Гимнастика",
  "Художественная гимнастика",
  "Паркур",
  "Акробатика",
  "Тренировка на ловкость",
  "Тренировка на координацию",
  "Тренировка для реабилитации",
  "Тренировка для пожилого человека",
  "Тренировка для беременной",
  "Игровая активность",
  "Тренировка для скорости",
  "Функциональный тренинг",
  "Занятие на тренажере",
  "Командный вид спорта",
];

export default function DiaryTraining() {
  const [selectedTrainingType, setSelectedTrainingType] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");
  const [review, setReview] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [trainingHistory, setTrainingHistory] = useState([]);

  const handleSave = () => {
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      type: selectedTrainingType,
      duration,
      intensity,
      review,
    };

    setTrainingHistory((prevHistory) => [newEntry, ...prevHistory]);

    setSelectedTrainingType("");
    setDuration("");
    setIntensity("");
    setReview("");
  };

  const renderTrainingType = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setSelectedTrainingType(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Дневник тренировок</Text>

      <Text style={styles.label}>Тип тренировки:</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {selectedTrainingType || "Выберите тип"}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Выберите тренировку</Text>
            <FlatList
              data={trainingTypes}
              renderItem={renderTrainingType}
              keyExtractor={(item) => item}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
            <Button title="Отмена" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Text style={styles.label}>Длительность (мин.):</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        placeholder="Введите длительность"
      />

      <Text style={styles.label}>Интенсивность (1-10):</Text>
      <TextInput
        style={styles.input}
        value={intensity}
        onChangeText={setIntensity}
        keyboardType="numeric"
        placeholder="Введите интенсивность"
      />

      <Text style={styles.label}>Отзыв:</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={review}
        onChangeText={setReview}
        placeholder="Ваш отзыв"
        multiline
      />

      <Button title="Сохранить запись" onPress={handleSave} />
      <Text style={styles.historyTitle}>История тренировок:</Text>
      {trainingHistory.length === 0 ? (
        <Text style={styles.noHistory}>Пока нет записей</Text>
      ) : (
        trainingHistory.map((entry) => (
          <View key={entry.id} style={styles.historyItem}>
            <Text style={styles.historyText}>Дата: {entry.date}</Text>
            <Text style={styles.historyText}>Тип: {entry.type}</Text>
            <Text style={styles.historyText}>
              Длительность: {entry.duration} мин.
            </Text>
            <Text style={styles.historyText}>
              Интенсивность: {entry.intensity}/10
            </Text>
            <Text style={styles.historyText}>Отзыв: {entry.review || "—"}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textarea: {
    height: 80,
    textAlignVertical: "top",
  },
  selector: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  selectorText: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  modalItemText: {
    fontSize: 16,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    color: "#333",
  },
  noHistory: {
    fontStyle: "italic",
    color: "#777",
  },
  historyItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  historyText: {
    fontSize: 14,
    color: "#333",
  },
});
