import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import OneFieldForm from "../../../components/OneFieldForm";
import ProgressBar from "../../../components/ProgressBar";

import Colors from "../../../constants/Colors";
import styles from "./styles";

const screenWidth = Dimensions.get("window").width;

export default function PasswordScreen({ navigation, route }) {
  const filedLength = 50;
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const passwordField = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setProgress(0.85);
    }, 250);
  }, []);

  const handlerPassword = (e) => {
    setPassword(e.trim());
    if (e.length === 0) {
      setConfirmDisabled(true);
    } else {
      setConfirmDisabled(false);
    }
  };

  const handlerSubmit = async () => {
    const user = {
      cpf: route.params.cpf,
      password: password,
    };

    setLoading(true);
    setConfirmDisabled(true);

    setLoading(false);
    setConfirmDisabled(false);

    //if(api.signin())
    navigation.replace("SignedIn", user);
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
        field={password}
        fieldName="Senha"
        confirmDisabled={confirmDisabled}
        setConfirmDisabled={setConfirmDisabled}
        loading={loading}
        onSubmit={handlerSubmit}
        msgDisabled="Ops... por favor, informe sua senha"
        formField={
          <TextInput
            secureTextEntry={true}
            value={password}
            ref={passwordField}
            style={[
              styles.input,
              { color: loading ? Colors.textDisabled : Colors.textDark },
            ]}
            editable={!loading}
            placeholder="Informe sua senha"
            autoCompleteType="password"
            autoCapitalize="none"
            textContentType="newPassword"
            autoFocus={true}
            placeholderTextColor={Colors.textDisabled}
            maxLength={filedLength}
            onChangeText={handlerPassword}
            onSubmitEditing={handlerSubmit}
          />
        }
      >
        <TouchableOpacity style={styles.tipContainer}>
          <Text style={styles.link}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </OneFieldForm>
    </>
  );
}
