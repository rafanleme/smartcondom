import React, { useState, useEffect, useRef } from "react";
import { View, Text, Animated, Dimensions } from "react-native";

import TouchableCardView from "../../../components/TouchableCardView";
import ProgressBar from "../../../components/ProgressBar";

import Colors from "../../../constants/Colors";
import ManagerIcon from "../../../../assets/images/svg/ManagerIcon";
import MemberIcon from "../../../../assets/images/svg/MemberIcon";
import styles from "./styles";

const screenWidth = Dimensions.get("window").width;

export default function CpfSreen({ navigation, route }) {
  const [progress, setProgress] = useState(0.14);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
    }).start();

    setTimeout(() => {
      setProgress(0.28);
    }, 250);
  }, []);

  const navigateToNameScreen = (choice) => {
    const user = {
      cpf: route.params.cpf,
      type: choice,
    };
    navigation.navigate("NameScreen", { user });
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} />
      <Animated.View style={[styles.containerFade, { opacity: fadeAnim }]}>
        <TouchableCardView
          onPress={() => {
            navigateToNameScreen("manager");
          }}
          style={styles.cardView}
        >
          <ManagerIcon style={styles.cardIcon} />
          <Text style={{ fontSize: 20, textAlign: "center", marginTop: 12 }}>
            Sou um
          </Text>
          <Text
            style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}
          >
            ADMINISTRADOR
          </Text>
        </TouchableCardView>
        <TouchableCardView
          onPress={() => {
            navigateToNameScreen("member");
          }}
          style={styles.cardView}
        >
          <MemberIcon style={styles.cardIcon} />
          <Text style={{ fontSize: 20, textAlign: "center", marginTop: 12 }}>
            Sou um
          </Text>
          <Text
            style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}
          >
            MORADOR
          </Text>
        </TouchableCardView>
      </Animated.View>
    </View>
  );
}
