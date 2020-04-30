import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: 6,
    backgroundColor: Colors.textLight,
    flexDirection: "row",
    alignContent: "stretch",
  },
  box: { backgroundColor: Colors.tintColor },
});
