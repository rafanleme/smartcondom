import { StyleSheet } from "react-native";
import Constants from "expo-constants";

import Colors from "../../../constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerFade: {
    flex: 1,
    backgroundColor: "#fe3f1933",
    justifyContent: "flex-end",
    paddingHorizontal: 12,
  },
  buttonEntry: {
    alignSelf: "stretch",
    alignItems: "center",
    height: 48,
    marginTop: 12,
    padding: 8,
    borderRadius: 8,
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: Colors.primary,
    justifyContent: "center",
  },
  textButton: {
    fontSize: 20,
    color: Colors.textGray,
  },

  containerFooter: {
    marginBottom: 12,
  },
});
