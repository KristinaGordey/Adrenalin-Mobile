import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressCircle = ({ progress, radius = 80, strokeWidth = 10 }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const clampedProgress = Math.min(1, Math.max(0, progress));

    Animated.timing(animatedValue, {
      toValue: clampedProgress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const circleCenter = radius + strokeWidth / 2;

  return (
    <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
      <Circle
        stroke="#e6e6e6"
        fill="none"
        cx={circleCenter}
        cy={circleCenter}
        r={radius}
        strokeWidth={strokeWidth}
      />

      <AnimatedCircle
        stroke="#5fd1a5"
        fill="none"
        cx={circleCenter}
        cy={circleCenter}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default ProgressCircle;
