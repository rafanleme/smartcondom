import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

import ProgressBar from "../../../components/ProgressBar";

import Colors from "../../../constants/Colors";
import styles from "./styles";

const screenWidth = Dimensions.get("window").width;

export default function SuccessRegisterSreen({ navigation, route }) {
  const [progress, setProgress] = useState(0.85);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animTxt1 = useRef(new Animated.Value(0)).current;
  const animTxt2 = useRef(new Animated.Value(0)).current;
  const animTxt3 = useRef(new Animated.Value(0)).current;
  const animTxt4 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animTxt1, {
        toValue: 1,
        duration: 800,
      }),
      Animated.timing(animTxt2, {
        toValue: 1,
        duration: 400,
      }),
    ]).start();

    setTimeout(() => {
      setProgress(1);
    }, 250);

    setTimeout(() => {
      navigation.replace("SignedIn");
    }, 1500);
  }, []);

  const navigateToRegisterTypeScreen = () => {
    navigation.navigate("RegisterTypeScreen", { cpf: route.params.cpf });
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} />
      <Animated.View style={[styles.containerFade, { opacity: fadeAnim }]}>
        <TouchableWithoutFeedback
          onPress={navigateToRegisterTypeScreen}
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <View>
            <Animated.Text style={[styles.text1, { opacity: animTxt1 }]}>
              OK!
            </Animated.Text>
            <Animated.Text style={[styles.text2, { opacity: animTxt2 }]}>
              Vamos começar...
            </Animated.Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
}
