import React, { useState, useEffect, useRef } from "react";
import { TextInput, Keyboard, Alert, Dimensions, Text } from "react-native";

// import {} from "@react-navigation/native";

import OneFieldForm from "../../../components/OneFieldForm";
import ProgressBar from "../../../components/ProgressBar";
import SkipHeaderButton from "../../../components/SkipHeaderButton";
import api from "../../../services/api";

import Colors from "../../../constants/Colors";
import styles from "./styles";

const screenWidth = Dimensions.get("window").width;

function EmailScreen({ navigation, route }) {
  const filedLength = 150;
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(0.42);
  const [loading, setLoading] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const emailField = useRef(null);

  navigation.setOptions({
    headerRight: () => <SkipHeaderButton />,
  });

  useEffect(() => {
    setTimeout(() => {
      setProgress(0.56);
    }, 250);
  }, []);

  const handlerEmail = (e) => {
    setEmail(e.trim());
    if (!e.trim().match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)) {
      setConfirmDisabled(true);
    } else {
      setConfirmDisabled(false);
    }
  };

  const handlerSubmit = async () => {
    const cleanedEmail = email.trim();
    const user = {
      ...route.params.user,
      email: cleanedEmail,
    };
    setLoading(true);
    setConfirmDisabled(true);

    const response = await api.get(`/isInUse/email/${cleanedEmail}`);

    setLoading(false);
    setConfirmDisabled(false);

    if (response.data.inUse)
      return Alert.alert(
        "Ops...",
        "Este endereço de e-mail já está em uso por outra conta"
      );

    console.log("--", user);

    navigation.navigate("PhoneScreen", { user });
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
        field={email}
        fieldName="E-MAIL"
        confirmDisabled={confirmDisabled}
        setConfirmDisabled={setConfirmDisabled}
        loading={loading}
        onSubmit={handlerSubmit}
        msgDisabled="Ops, o e-mail precisa ser válido"
        formField={
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
        }
      ></OneFieldForm>
    </>
  );
}

export default EmailScreen;
