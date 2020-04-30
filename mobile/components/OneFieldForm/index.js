import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-tiny-toast";

import styles from "./styles";
import Colors from "../../constants/Colors";

export default function OneFieldForm(props) {
  const {
    field,
    confirmDisabled,
    fieldName,
    onSubmit,
    loading,
    msgDisabled,
  } = props;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 750,
    }).start();
  }, []);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 + 64 : 18 + 64}
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
          <View
            style={[
              styles.containerLoading,
              {
                backgroundColor: loading
                  ? Colors.bgLoading
                  : Colors.transparent,
              },
            ]}
          >
            <ActivityIndicator
              size="large"
              animating={loading}
              color={Colors.tintColor}
            />
          </View>
          <View style={styles.containerInput}>
            <AnimatedLabel label={fieldName} show={field.length !== 0} />
            {props.children}
          </View>
          <View style={styles.containerFooter}>
            <ButtonConfirm
              disabled={confirmDisabled}
              msgDisabled={msgDisabled}
              onPress={(e) => {
                onSubmit(e);
              }}
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

  return <Animated.Text style={labelStyle}>{props.label}:</Animated.Text>;
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
                  position: 68,
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
