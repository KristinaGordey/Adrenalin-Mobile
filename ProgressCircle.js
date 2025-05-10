import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressCircle = ({ progress, radius = 80, strokeWidth = 10 }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Обновляем прогресс в анимации, клиппируем его в диапазон от 0 до 1
    const clampedProgress = Math.min(1, Math.max(0, progress));

    Animated.timing(animatedValue, {
      toValue: clampedProgress, // Устанавливаем конечное значение анимации
      duration: 300,
      useNativeDriver: false, // strokeDashoffset не поддерживает useNativeDriver
    }).start();
  }, [progress]);

  const circumference = 2 * Math.PI * radius; // Длина окружности круга
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1], // При значении 0 - полностью пустой круг, при 1 - полностью заполнен
    outputRange: [circumference, 0], // strokeDashoffset изменяется от длины окружности до 0
  });

  const circleCenter = radius + strokeWidth / 2; // Центр круга с учетом толщины обводки

  return (
    <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
      {/* Фоновая окружность */}
      <Circle
        stroke="#e6e6e6"
        fill="none"
        cx={circleCenter}
        cy={circleCenter}
        r={radius}
        strokeWidth={strokeWidth}
      />
      {/* Анимированная окружность */}
      <AnimatedCircle
        stroke="#5fd1a5"
        fill="none"
        cx={circleCenter}
        cy={circleCenter}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference} // Устанавливаем длину окружности для штриха
        strokeDashoffset={strokeDashoffset} // Анимация на основе прогресса
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default ProgressCircle;
