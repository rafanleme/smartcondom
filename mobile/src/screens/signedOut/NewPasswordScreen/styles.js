import { StyleSheet } from "react-native";

import styles from "../../../components/OneFieldForm/styles";
import Colors from "../../../constants/Colors";

export default StyleSheet.create({
  ...styles,
  tipContainer: {
    padding: 12,
    marginBottom: 24,
  },
  tipHeader: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 4,
    color: Colors.textDark,
  },
  tipItem: {
    fontSize: 16,
    color: Colors.textDark,
    paddingBottom: 4,
  },
});
