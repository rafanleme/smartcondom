import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

export default StyleSheet.create({
  cardView: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowOffset: {
      width: 2 - 2,
      height: 2 - 2,
    },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
});
