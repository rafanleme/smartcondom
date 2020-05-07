import React, { useState, useEffect, useRef } from "react";
import { View, Text, Alert, Dimensions } from "react-native";
import { TextInputMask } from "react-native-masked-text";

import OneFieldForm from "../../../components/OneFieldForm";
import ProgressBar from "../../../components/ProgressBar";

import Colors from "../../../constants/Colors";
import styles from "./styles";

const screenWidth = Dimensions.get("window").width;

export default function Phonescreen({ navigation, route }) {
  const filedLength = 150;
  const [phone, setPhone] = useState("");
  const [progress, setProgress] = useState(0.56);
  const [loading, setLoading] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const phoneField = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setProgress(0.7);
    }, 250);
  }, []);

  const handlerPhone = (e) => {
    setPhone(e.trim());
    if (!e.trim().match(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/i)) {
      setConfirmDisabled(true);
    } else {
      setConfirmDisabled(false);
    }
  };

  const handlerSubmit = async () => {
    const unmaskedPhone = phoneField.current.getRawValue();
    const user = {
      ...route.params.user,
      phone: unmaskedPhone,
    };
    setLoading(true);
    setConfirmDisabled(true);

    setTimeout(() => {
      setLoading(false);
      setConfirmDisabled(false);

      if (unmaskedPhone === "19998208014")
        return Alert.alert(
          "Ops...",
          "Este número já está em uso por outra conta"
        );
      navigation.navigate("NewPasswordScreen", user);
    }, 250);
  };

  return (
    <>
      <ProgressBar
        progress={progress}
        width={screenWidth}
        borderRadius={0}
        borderWidth={0}
        unfilledColor={Colors.textLight}
        color={Colors.tintColor}
      />
      <OneFieldForm
        field={phone}
        fieldName="Celular"
        confirmDisabled={confirmDisabled}
        setConfirmDisabled={setConfirmDisabled}
        loading={loading}
        onSubmit={handlerSubmit}
        msgDisabled="Ops, o celular precisa ser válido"
        formField={
          <TextInputMask
            type="cel-phone"
            value={phone}
            ref={phoneField}
            style={[
              styles.input,
              { color: loading ? Colors.textDisabled : Colors.textDark },
            ]}
            editable={!loading}
            placeholder="Informe aqui seu celular"
            keyboardType="phone-pad"
            autoCompleteType="tel"
            autoCapitalize="none"
            textContentType="telephoneNumber"
            autoFocus={true}
            placeholderTextColor={Colors.textDisabled}
            maxLength={filedLength}
            onChangeText={handlerPhone}
            onSubmitEditing={handlerSubmit}
          />
        }
      ></OneFieldForm>
    </>
  );
}
