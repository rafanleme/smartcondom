import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Keyboard,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";

import OneFieldForm from "../../../components/OneFieldForm";
import ProgressBar from "../../../components/ProgressBar";

import api from "../../../services/api";

import Colors from "../../../constants/Colors";
import styles from "./styles";

const screenWidth = Dimensions.get("window").width;

export default function NewPasswordScreen({ navigation, route }) {
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
    if (!e.trim().match(/^(?=.*[A-Z]{1})(?=.*[0-9])(?=.*[a-z]).{8,}$/g)) {
      setConfirmDisabled(true);
    } else {
      setConfirmDisabled(false);
    }
  };

  const handlerSubmit = async () => {
    const user = {
      ...route.params.user,
      password: password,
    };
    setLoading(true);
    setConfirmDisabled(true);

    try {
      const type = user.type;
      delete user.type;

      console.log("teste");

      await api.post(`/${type}s`, user);

      setLoading(false);
      setConfirmDisabled(false);

      Keyboard.dismiss();

      navigation.navigate("SuccessRegisterScreen", user);
    } catch (error) {
      setLoading(false);
      setConfirmDisabled(false);
      console.log(error.response);
      return Alert.alert("Houve um problema", "Tente novamente mais tarde");
    }
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
        fieldName="Nova senha"
        confirmDisabled={confirmDisabled}
        setConfirmDisabled={setConfirmDisabled}
        loading={loading}
        onSubmit={handlerSubmit}
        msgDisabled="Ops, sua senha não está de acordo com as regras"
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
            placeholder="Informe uma nova senha"
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
        <View style={styles.tipContainer}>
          <Text style={styles.tipHeader}>Regras:</Text>
          <Text style={styles.tipItem}>- Mínimo de 8 caracteres</Text>
          <Text style={styles.tipItem}>- Pelo menos uma letra maiúscula</Text>
          <Text style={styles.tipItem}>- Pelo menos uma letra minúscula</Text>
          <Text style={styles.tipItem}>- Pelo menos um número</Text>
        </View>
      </OneFieldForm>
    </>
  );
}
