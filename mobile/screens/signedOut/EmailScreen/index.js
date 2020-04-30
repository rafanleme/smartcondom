import React, { useState, useEffect, useRef } from "react";
import { TextInput, Keyboard, Alert, Dimensions } from "react-native";

import OneFieldForm from "../../../components/OneFieldForm";

import Colors from "../../../constants/Colors";
import styles from "./styles";

const screenWidth = Dimensions.get("window").width;

export default function EmailScreen({ navigation }) {
  const filedLength = 150;
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const emailField = useRef(null);

  const handlerEmail = (e) => {
    setEmail(e.trim());
    console.log(e);
    if (!e.trim().match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)) {
      setConfirmDisabled(true);
    } else {
      setConfirmDisabled(false);
    }
  };

  const handlerSubmit = () => {
    return console.log("ops ñ é email");
    // const unmaskedCpf = emailField.current.getRawValue();
    // setLoading(true);
    // setConfirmDisabled(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setConfirmDisabled(false);
    //   if (!emailField.current.isValid())
    //     return Alert.alert(
    //       "Ops",
    //       "CPF inválido, verifique o número e tente novamente"
    //     );
    //   if (unmaskedCpf !== "39252377808") navigation.navigate("PassScreen");
    //   else navigation.navigate("HomeRegisterScreen", { email: unmaskedCpf });
    // }, 250);
  };

  return (
    <>
      <OneFieldForm
        field={email}
        fieldName="E-MAIL"
        confirmDisabled={confirmDisabled}
        setConfirmDisabled={setConfirmDisabled}
        loading={loading}
        onSubmit={handlerSubmit}
        msgDisabled="Ops, o e-mail precisa ser válido"
      >
        <TextInput
          value={email}
          ref={emailField}
          style={[
            styles.input,
            { color: loading ? Colors.textDisabled : Colors.textDark },
          ]}
          editable={!loading}
          placeholder="Informe aqui seu E-mail"
          keyboardType="email-address"
          autoCompleteType="email"
          autoCapitalize="none"
          textContentType="emailAddress"
          autoFocus={true}
          placeholderTextColor={Colors.textDisabled}
          maxLength={filedLength}
          onChangeText={handlerEmail}
          onSubmitEditing={handlerSubmit}
        />
      </OneFieldForm>
    </>
  );
}
