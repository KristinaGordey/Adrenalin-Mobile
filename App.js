import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Импортируем экраны
import LoginScreen from "./LoginScreen";
import MenuScreen from "./MenuScreen";
import CycleTimerScreen from "./CycleTimerScreen";
import DiaryTraining from "./DiaryTraining"; // Новый экран дневника тренировок

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Экран входа */}
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* Экран меню */}
        <Stack.Screen name="Menu" component={MenuScreen} />
        {/* Экран таймера */}
        <Stack.Screen name="CycleTimer" component={CycleTimerScreen} />
        {/* Новый экран дневника тренировок */}
        <Stack.Screen name="DiaryTraining" component={DiaryTraining} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
