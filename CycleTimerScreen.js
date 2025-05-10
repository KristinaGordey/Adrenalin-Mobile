import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import ProgressCircle from "./ProgressCircle"; // путь к файлу

const CycleTimerScreen = () => {
  const [workTime, setWorkTime] = useState(30);
  const [restTime, setRestTime] = useState(10);
  const [cycles, setCycles] = useState(3);

  const [currentCycle, setCurrentCycle] = useState(1);
  const [time, setTime] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [status, setStatus] = useState("Тренировка");

  const pulseAnim = useRef(new Animated.Value(1)).current;

  const cycleRef = useRef(currentCycle);
  const isRestingRef = useRef(isResting);

  useEffect(() => {
    cycleRef.current = currentCycle;
    isRestingRef.current = isResting;
  }, [currentCycle, isResting]);

  useEffect(() => {
    let timer;
    if (isRunning && !isPaused) {
      timer = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            if (isRestingRef.current) {
              if (cycleRef.current < cycles) {
                setCurrentCycle((prev) => prev + 1);
                setIsResting(false);
                setStatus("Тренировка");
                return workTime;
              } else {
                setIsRunning(false);
                setStatus("Завершено");
                alert("Тренировка завершена!");
                return 0;
              }
            } else {
              setIsResting(true);
              setStatus("Отдых");
              return restTime;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, isPaused, workTime, restTime, cycles]);

  useEffect(() => {
    if (status === "Тренировка") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [status]);

  const startTimer = () => {
    if (status === "Завершено") {
      resetTimer();
    }
    setIsRunning(true);
    setIsPaused(false);
  };

  const stopTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setIsResting(false);
    setCurrentCycle(1);
    setStatus("Тренировка");
    setTime(workTime);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Таймер тренировки</Text>
      {/* Передаем актуальный прогресс времени для тренировки или отдыха */}
      <ProgressCircle
        key={currentCycle} // Добавляем ключ для перерисовки
        progress={time / (isResting ? restTime : workTime)}
        radius={80} // Можно настроить радиус круга
        strokeWidth={10} // Можно настроить толщину обводки
      />

      <Animated.Text
        style={[
          styles.statusText,
          status === "Тренировка" && {
            color: "#5fd1a5",
            transform: [{ scale: pulseAnim }],
          },
          status === "Отдых" && { color: "#999" },
          status === "Завершено" && { color: "red" },
        ]}
      >
        {status}
      </Animated.Text>

      <Text style={styles.timer}>{formatTime(time)}</Text>
      <Text style={styles.cycleText}>
        Цикл {currentCycle} из {cycles}
      </Text>

      <View style={styles.buttons}>
        {!isRunning || isPaused ? (
          <TouchableOpacity style={styles.button} onPress={startTimer}>
            <Text style={styles.buttonText}>Старт</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={stopTimer}>
            <Text style={styles.buttonText}>Пауза</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>Сбросить</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settings}>
        <Text style={styles.settingLabel}>Время работы (сек):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(workTime)}
          onChangeText={(text) => {
            const val = Number(text);
            setWorkTime(val);
            if (!isRunning && !isResting) setTime(val);
          }}
        />

        <Text style={styles.settingLabel}>Время отдыха (сек):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(restTime)}
          onChangeText={(text) => {
            const val = Number(text);
            setRestTime(val);
            if (!isRunning && isResting) setTime(val);
          }}
        />

        <Text style={styles.settingLabel}>Количество циклов:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(cycles)}
          onChangeText={(text) => setCycles(Number(text))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5fd1a5",
    marginBottom: 20,
  },
  statusText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  cycleText: {
    fontSize: 18,
    marginBottom: 30,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: "#5fd1a5",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  settings: {
    marginTop: 40,
    width: "100%",
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CycleTimerScreen;
