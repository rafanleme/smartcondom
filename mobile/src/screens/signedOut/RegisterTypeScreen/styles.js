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
  cardView: {
    minWidth: 200,
    padding: 12,
    alignItems: "center",
  },
  cardIcon: {
    width: 100,
    height: 100,
    margin: 12,
  },
});
