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
import ManagerIcon from "../../../assets/images/svg/ManagerIcon";
import MemberIcon from "../../../assets/images/svg/MemberIcon";
import styles from "./styles";

const screenWidth = Dimensions.get("window").width;

export default function CpfSreen({ navigation, route }) {
  const [progress, setProgress] = useState(0);
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
        duration: 800,
      }),
      Animated.timing(animTxt3, {
        toValue: 1,
        duration: 800,
      }),
      Animated.timing(animTxt4, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(animTxt4, {
        toValue: 0.2,
        duration: 120,
      }),
      Animated.timing(animTxt4, {
        toValue: 1,
        duration: 120,
      }),
      Animated.timing(animTxt4, {
        toValue: 0.2,
        duration: 120,
      }),
      Animated.timing(animTxt4, {
        toValue: 1,
        duration: 120,
      }),
    ]).start();

    setTimeout(() => {
      setProgress(0.16);
    }, 250);
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
              Olá, vi que você é novo por aqui.
            </Animated.Text>
            <Animated.Text style={[styles.text2, { opacity: animTxt2 }]}>
              Seja bem-vindo!
            </Animated.Text>
            <Animated.Text style={[styles.text3, { opacity: animTxt3 }]}>
              Para começarmos vamos fazer um breve cadastro.
            </Animated.Text>
            <Animated.Text style={[styles.text4, { opacity: animTxt4 }]}>
              Toque para começar
            </Animated.Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
}
