import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import FeedScreen from "../screens/FeedScreen";
import AreasScreen from "../screens/AreasScreen";
import MenuScreen from "../screens/MenuScreen";

import Colors from "../constants/Colors";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: Colors.tintColor,
      }}
    >
      <BottomTab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: "Feed",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-list" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Areas"
        component={AreasScreen}
        options={{
          title: "Áreas",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-bookmarks" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          title: "Menu",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-menu" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Feed":
      return "Feed";
    case "Areas":
      return "Agendamento de áreas comuns";
    case "Menu":
      return "Menu de opções";
  }
}
