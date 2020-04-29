import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import HomeScreen from "../screens/signedOut/HomeScreen";
import CpfScreen from "../screens/signedOut/CpfScreen";

import Colors from "../constants/Colors";

const optionsHeader = {
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

export default function Login() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CpfScreen"
        component={CpfScreen}
        options={{ ...optionsHeader, title: "Entrar com CPF" }}
      />
    </Stack.Navigator>
  );
}
