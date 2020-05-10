import { StyleSheet } from "react-native";

import Colors from "../../../constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerFade: {
    flex: 1,
    backgroundColor: Colors.textLight,
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
  },
  text1: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 24,
    color: Colors.success,
  },
  text2: { fontSize: 20, textAlign: "center", marginTop: 72 },
});
