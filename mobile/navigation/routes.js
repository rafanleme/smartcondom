import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

import SignedOut from "../navigation/LoginNavigator";
import BottomTabNavigator from "./BottomTabNavigator";

export default function Routes() {
  const signedIn = false;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={signedIn ? "SignedIn" : "SignedOut"}>
        <Stack.Screen
          name="SignedOut"
          component={SignedOut}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="SignedIn" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
