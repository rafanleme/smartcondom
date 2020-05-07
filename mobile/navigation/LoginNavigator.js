import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import HomeScreen from "../screens/signedOut/HomeScreen";
import CpfScreen from "../screens/signedOut/CpfScreen";
import RegisterTypeScreen from "../screens/signedOut/RegisterTypeScreen";
import NameScreen from "../screens/signedOut/NameScreen";
import HomeRegisterScreen from "../screens/signedOut/HomeRegisterScreen";
import EmailScreen from "../screens/signedOut/EmailScreen";
import PhoneScreen from "../screens/signedOut/PhoneScreen";
import NewPasswordScreen from "../screens/signedOut/NewPasswordScreen";
import PasswordScreen from "../screens/signedOut/PasswordScreen";

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
  headerTitleAlign: "center",
  title: "",
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
        options={{ ...optionsHeader, title: "" }}
      />
      <Stack.Screen
        name="RegisterTypeScreen"
        component={RegisterTypeScreen}
        options={{
          ...optionsHeader,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="NameScreen"
        component={NameScreen}
        options={{
          ...optionsHeader,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="HomeRegisterScreen"
        component={HomeRegisterScreen}
        options={{
          ...optionsHeader,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="EmailScreen"
        component={EmailScreen}
        options={{
          ...optionsHeader,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="PhoneScreen"
        component={PhoneScreen}
        options={{
          ...optionsHeader,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="NewPasswordScreen"
        component={NewPasswordScreen}
        options={{
          ...optionsHeader,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="PasswordScreen"
        component={PasswordScreen}
        options={{
          ...optionsHeader,
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
