import React, { useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/LoginScreen/index";

export default function Routes(props) {
  const Stack = createStackNavigator();
  console.log("criou");
  return (
    //initialState={props.signedIn ? "" : LoginScreen}
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
