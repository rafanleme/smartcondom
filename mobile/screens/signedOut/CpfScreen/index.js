import React, { useState, useEffect, useRef } from "react";
import { TextInput, Keyboard, Alert, Dimensions } from "react-native";
import { TextInputMask } from "react-native-masked-text";

import OneFieldForm from "../../../components/OneFieldForm";

import Colors from "../../../constants/Colors";
import styles from "./styles";

const screenWidth = Dimensions.get("window").width;

export default function CpfSreen({ navigation }) {
  const filedLength = 14;
  const [cpf, setCpf] = useState("");
  const [progress, setProgress] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const cpfField = useRef(null);

  const handlerCpf = (e) => {
    setCpf(e);
    if (e.length < filedLength) {
      setConfirmDisabled(true);
    } else {
      Keyboard.dismiss();
      setConfirmDisabled(false);
    }
  };

  const handlerSubmit = () => {
    const unmaskedCpf = cpfField.current.getRawValue();
    setLoading(true);
    setConfirmDisabled(true);

    setTimeout(() => {
      setLoading(false);
      setConfirmDisabled(false);

      if (!cpfField.current.isValid())
        return Alert.alert(
          "Ops",
          "CPF inválido, verifique o número e tente novamente"
        );

      if (unmaskedCpf !== "39252377808") navigation.navigate("PassScreen");
      else navigation.navigate("HomeRegisterScreen", { cpf: unmaskedCpf });
    }, 250);
  };

  return (
    <>
      <OneFieldForm
        field={cpf}
        fieldName="CPF"
        confirmDisabled={confirmDisabled}
        setConfirmDisabled={setConfirmDisabled}
        loading={loading}
        onSubmit={handlerSubmit}
        msgDisabled="Ops, preencha por favor o CPF"
      >
        <TextInputMask
          type={"cpf"}
          value={cpf}
          ref={cpfField}
          style={[
            styles.input,
            { color: loading ? Colors.textDisabled : Colors.textDark },
          ]}
          editable={!loading}
          placeholder="Informe aqui seu CPF"
          keyboardType="number-pad"
          autoFocus={true}
          placeholderTextColor={Colors.textDisabled}
          maxLength={filedLength}
          onChangeText={handlerCpf}
          onSubmitEditing={handlerSubmit}
        />
      </OneFieldForm>
    </>
  );
}
