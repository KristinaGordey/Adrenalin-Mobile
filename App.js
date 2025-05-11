import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";
import MenuScreen from "./MenuScreen";
import CycleTimerScreen from "./CycleTimerScreen";
import DiaryTraining from "./DiaryTraining";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        <Stack.Screen name="Menu" component={MenuScreen} />

        <Stack.Screen name="CycleTimer" component={CycleTimerScreen} />

        <Stack.Screen name="DiaryTraining" component={DiaryTraining} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
