import React, { useState, useEffect, useRef } from "react";
import { TextInput, Keyboard, Alert, Dimensions } from "react-native";
import { TextInputMask } from "react-native-masked-text";

import OneFieldForm from "../../../components/OneFieldForm";
import api from "../../../services/api";

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
      setConfirmDisabled(false);
    }
  };

  const handlerSubmit = async () => {
    const unmaskedCpf = cpfField.current.getRawValue();
    if (!cpfField.current.isValid())
      return Alert.alert(
        "Ops",
        "CPF inválido, verifique o número e tente novamente"
      );
    setLoading(true);
    setConfirmDisabled(true);

    try {
      const response = await api.get(`/isInUse/cpf/${unmaskedCpf}`);

      setLoading(false);

      if (response.data.inUse)
        return navigation.navigate("PasswordScreen", { cpf: unmaskedCpf });
      else
        return navigation.navigate("HomeRegisterScreen", { cpf: unmaskedCpf });
    } catch (error) {
      setLoading(false);
      console.log(error);
      return Alert.alert(
        "Ops",
        "CPF inválido, verifique o número e tente novamente"
      );
    }
  };

  return (
    <>
      <Text>
        LH<Text>09996</Text>
        <Text>
          0655<Text>US</Text>
        </Text>
      </Text>
      <OneFieldForm
        field={cpf}
        fieldName="CPF"
        confirmDisabled={confirmDisabled}
        setConfirmDisabled={setConfirmDisabled}
        loading={loading}
        onSubmit={handlerSubmit}
        msgDisabled="Ops, preencha por favor o CPF"
        formField={
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
        }
      ></OneFieldForm>
    </>
  );
}
