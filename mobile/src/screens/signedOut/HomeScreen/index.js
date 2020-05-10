import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";
import Colors from "../../../constants/Colors";
import bgImg from "../../../../assets/images/bg-home.jpg";
import logoImg from "../../../../assets/images/icon.png";

export default function Home({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

  useEffect(() => {
    setTimeout(() => {
      fadeIn();
    }, 750);
  }, []);

  const nagivateToCpf = () => {
    navigation.navigate("CpfScreen");
  };

  return (
    <ImageBackground
      source={bgImg}
      style={styles.container}
      imageStyle={{ resizeMode: "cover" }}
    >
      <Animated.View
        style={[
          styles.containerFade,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Image
          source={logoImg}
          resizeMode="contain"
          style={{
            marginLeft: 12,
            width: 100,
            position: "absolute",
            top: 0,
          }}
        />
        <View style={styles.containerFooter}>
          <Text
            style={{
              fontSize: 55,
              color: Colors.textLight,
              textShadowColor: "black",
              textShadowOffset: {
                width: 2,
                height: 2,
              },
              textShadowRadius: 1,
            }}
          >
            Seu condomínio em suas mãos!
          </Text>
          <TouchableOpacity style={styles.buttonEntry} onPress={nagivateToCpf}>
            <Text style={styles.textButton}>Entrar com CPF</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonEntry,
              {
                borderColor: "#3B5998",
                backgroundColor: "#3B5998",
                flexDirection: "row",
              },
            ]}
            onPress={() => {}}
          >
            <Ionicons
              name="logo-facebook"
              size={30}
              style={{ marginRight: 10 }}
              color="#fff"
            />
            <Text style={[styles.textButton, { color: Colors.textLight }]}>
              Entrar com Facebook
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ImageBackground>
  );
}
