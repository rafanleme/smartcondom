import React, { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import Toast from "react-native-tiny-toast";

import Colors from "../../constants/Colors";

import styles from "./styles";

export default function SkipHeaderButton(props) {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.container}>
        <Text style={styles.text}>Pular</Text>
        <Ionicons
          name={
            Platform.OS === "ios" ? "ios-arrow-forward" : "md-arrow-forward"
          }
          size={Platform.OS === "ios" ? 30 : 26}
          color={Colors.textDark}
        />
      </View>
    </TouchableOpacity>
  );
}
