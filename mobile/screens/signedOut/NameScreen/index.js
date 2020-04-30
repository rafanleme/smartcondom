import React, { useState, useEffect, useRef } from "react";
import { TextInput, Keyboard, Alert, Dimensions } from "react-native";
import { TextInputMask } from "react-native-masked-text";

import OneFieldForm from "../../../components/OneFieldForm";
import ProgressBar from "../../../components/ProgressBar";

import Colors from "../../../constants/Colors";
import styles from "./styles";

const screenWidth = Dimensions.get("window").width;

export default function NameSreen({ navigation, route }) {
  const fieldLength = 150;
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0.32);
  const [loading, setLoading] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const nameField = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setProgress(0.48);
    }, 250);
  }, []);

  const handlerName = (e) => {
    if (!e.match(/^[A-Za-záàâãéèêíïóôõöúçñ ]+$/) && e.length !== 0) return;
    setName(e);
    if (e.length < 4) {
      setConfirmDisabled(true);
    } else {
      setConfirmDisabled(false);
    }
  };

  const handlerSubmit = () => {
    const cleanedName = name.trim();
    const manager = {
      ...route.params.manager,
      name: cleanedName,
    };
    setLoading(true);
    setConfirmDisabled(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmDisabled(false);

      navigation.navigate("EmailScreen");
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
        field={name}
        fieldName="Nome"
        confirmDisabled={confirmDisabled}
        setConfirmDisabled={setConfirmDisabled}
        loading={loading}
        onSubmit={handlerSubmit}
        msgDisabled="Ops, o nome deve ter pelo menos 4 caracteres"
      >
        <TextInput
          value={name}
          ref={nameField}
          style={[
            styles.input,
            { color: loading ? Colors.textDisabled : Colors.textDark },
          ]}
          editable={!loading}
          placeholderTextColor={Colors.textDisabled}
          placeholder="Informe aqui seu nome"
          autoCapitalize="words"
          keyboardType="default"
          autoFocus={true}
          maxLength={fieldLength}
          onChangeText={handlerName}
          onSubmitEditing={handlerSubmit}
        />
      </OneFieldForm>
    </>
  );
}
