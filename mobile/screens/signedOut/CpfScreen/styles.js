import { StyleSheet } from "react-native";

import Colors from "../../../constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerFade: {
    flex: 1,
    backgroundColor: Colors.textLight,
    justifyContent: "flex-end",
  },
  button: {
    alignItems: "center",
    height: 58,
    marginTop: 12,
    padding: 8,
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: Colors.primary,
    justifyContent: "center",
  },
  textButton: {
    fontSize: 18,
    color: Colors.textGray,
    fontWeight: "bold",
  },
  buttonDisabled: {
    alignItems: "center",
    height: 58,
    marginTop: 12,
    padding: 8,
    borderColor: Colors.textLight,
    borderTopColor: Colors.textDisabled,
    borderWidth: 2,
    backgroundColor: Colors.textLight,
    justifyContent: "center",
  },
  textButtonDisabled: {
    fontSize: 18,
    color: Colors.textDisabled,
  },

  input: {
    color: Colors.textDark,
    width: "94%",
    alignSelf: "center",
    fontSize: 30,
    borderColor: "red",
    borderBottomWidth: 1,
    borderBottomColor: Colors.textDark,
  },

  inputLabel: {
    width: "94%",
    alignSelf: "center",
    fontSize: 16,
    marginBottom: 4,
  },
});
