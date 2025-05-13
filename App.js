import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";
import MenuScreen from "./MenuScreen";
import CycleTimerScreen from "./CycleTimerScreen";
import DiaryTraining from "./DiaryTraining";
import VideoExample from "./VideoExample";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Авторизация",
            headerTransparent: true,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: "Регистрация",
            headerTransparent: true,
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            title: "Меню",
            headerTransparent: true,
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="CycleTimer"
          component={CycleTimerScreen}
          options={{
            title: "Сaйкл-таймер",

            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="DiaryTraining"
          component={DiaryTraining}
          options={{
            title: "Мой дневник",

            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="VideoExample"
          component={VideoExample}
          options={{
            title: "Уроки",

            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
