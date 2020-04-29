import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Easing,
} from "react-native";
import Toast from "react-native-tiny-toast";

import styles from "./styles";

export default function CpfSreen() {
  const [cpf, setCpf] = useState("");
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const xPosition = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 750,
    }).start();
  }, []);

  const handlerCpf = (e) => {
    setCpf(e);
    if (e.length < 11) {
      setConfirmDisabled(true);
    } else {
      Keyboard.dismiss();
      setConfirmDisabled(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View
          style={[
            styles.containerFade,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.containerInput}>
            <AnimatedLabel show={cpf.length !== 0} />

            <TextInput
              style={styles.input}
              placeholder="Informe seu CPF aqui..."
              keyboardType="number-pad"
              autoFocus={true}
              placeholderTextColor="#ccc"
              maxLength={11}
              onChangeText={handlerCpf}
              onSubmitEditing={() => {
                this.buscar();
              }}
            />
          </View>
          <View style={styles.containerFooter}>
            <ButtonConfirm
              disabled={confirmDisabled}
              msgDisabled="Ops, preenche por favor o CPF"
              onPress={() => {}}
              text="Prosseguir"
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const AnimatedLabel = (props) => {
  const _animated = useRef(new Animated.Value(0)).current;

  const labelStyle = [
    styles.inputLabel,
    {
      height: _animated.interpolate({
        inputRange: [0, 0],
        outputRange: [0, 20],
        extrapolate: "clamp",
      }),
    },
    { opacity: _animated },
    {
      transform: [
        {
          rotate: _animated.interpolate({
            inputRange: [0, 0.5],
            outputRange: ["-20deg", "0deg"],
            extrapolate: "clamp",
          }),
        },
      ],
    },
  ];

  useEffect(() => {
    if (props.show) {
      Animated.timing(_animated, {
        toValue: 1,
        duration: 250,
      }).start();
    } else {
      Animated.timing(_animated, {
        toValue: 0,
        duration: 250,
      }).start();
    }
  }, [props.show]);

  return <Animated.Text style={labelStyle}>CPF:</Animated.Text>;
};

const ButtonConfirm = ({ text, disabled, onPress, msgDisabled }) => {
  const onPressLocal = () => {
    onPress();
  };

  return (
    <View style={styles.containerButton}>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.2}
        style={disabled ? styles.buttonDisabled : styles.button}
        onPress={
          disabled
            ? () => {
                Toast.show(msgDisabled, {
                  _animated: 68,
                });
              }
            : onPressLocal
        }
      >
        <Text style={disabled ? styles.textButtonDisabled : styles.textButton}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
