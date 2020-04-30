import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import HomeScreen from "../screens/signedOut/HomeScreen";
import CpfScreen from "../screens/signedOut/CpfScreen";
import RegisterTypeScreen from "../screens/signedOut/RegisterTypeScreen";
import NameScreen from "../screens/signedOut/NameScreen";
import HomeRegisterScreen from "../screens/signedOut/HomeRegisterScreen";
import EmailScreen from "../screens/signedOut/EmailScreen";

import Colors from "../constants/Colors";

const optionsHeader = {
  headerBackTitleVisible: true,
  headerBackTitle: "Voltar",
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
      <Stack.Screen
        name="RegisterTypeScreen"
        component={RegisterTypeScreen}
        options={{
          ...optionsHeader,
          title: "Você é um",
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="NameScreen"
        component={NameScreen}
        options={{
          ...optionsHeader,
          title: "Seu nome",
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="HomeRegisterScreen"
        component={HomeRegisterScreen}
        options={{
          ...optionsHeader,
          title: "Bem-vindo!",
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="EmailScreen"
        component={EmailScreen}
        options={{
          ...optionsHeader,
          title: "Bem-vindo!",
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
