import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Dimensions } from "react-native";
import Toast from "react-native-tiny-toast";

import styles from "./styles";
import Colors from "../../constants/Colors";

const widthScreen = Dimensions.get("screen").width;

export default function ProgressBar({ progress }) {
  const animWidth = useRef(new Animated.Value(widthScreen * progress)).current;

  useEffect(() => {
    const length = widthScreen * progress;
    Animated.timing(animWidth, {
      toValue: length,
      duration: 300,
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, { width: animWidth }]}></Animated.View>
    </View>
  );
}
