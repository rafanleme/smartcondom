import React, { useState, useEffect, useRef } from "react";
import { TextInput, Keyboard, Alert } from "react-native";

import OneFieldForm from "../../../components/OneFieldForm";

import Colors from "../../../constants/Colors";
import styles from "./styles";

export default function CpfSreen({ navigation }) {
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState("");
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const handlerCpf = (e) => {
    setCpf(e);
    if (e.length < 11) {
      setConfirmDisabled(true);
    } else {
      Keyboard.dismiss();
      setConfirmDisabled(false);
    }
  };

  const handlerSubmit = () => {
    setLoading(true);
    setConfirmDisabled(true);

    setTimeout(() => {
      setLoading(false);
      setConfirmDisabled(false);

      if (cpf !== "39252377808")
        Alert.alert(
          "Ops",
          "CPF inválido, verifique o número e tente novamente"
        );

      // if (cpf === "39252377808") navigation.navigate("PassScreen");
      // else navigation.navigate("RegisterTypeScreen");
    }, 1000);
  };

  return (
    <OneFieldForm
      field={cpf}
      fieldName="CPF"
      confirmDisabled={confirmDisabled}
      setConfirmDisabled={setConfirmDisabled}
      loading={loading}
      onSubmit={handlerSubmit}
    >
      <TextInput
        style={[
          styles.input,
          { color: loading ? Colors.textDisabled : Colors.textDark },
        ]}
        editable={!loading}
        placeholder="Informe aqui seu CPF"
        keyboardType="number-pad"
        autoFocus={true}
        placeholderTextColor={Colors.textDisabled}
        maxLength={11}
        onChangeText={handlerCpf}
        onSubmitEditing={handlerSubmit}
      />
    </OneFieldForm>
  );
}
