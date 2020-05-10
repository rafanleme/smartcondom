import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-tiny-toast";

import styles from "./styles";
import Colors from "../../constants/Colors";

export default function CardView(props) {
  return <View style={[props.style, styles.cardView]}>{props.children}</View>;
}
