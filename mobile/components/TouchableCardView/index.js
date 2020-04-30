import React, { useEffect, useRef } from "react";
import { TouchableHighlight } from "react-native";
import Toast from "react-native-tiny-toast";

import CardView from "../CardView";
import styles from "./styles";
import Colors from "../../constants/Colors";

export default function TouchableCardView(props) {
  return (
    <TouchableHighlight
      style={{ borderRadius: 12 }}
      underlayColor={Colors.primary}
      activeOpacity={0.9}
      onPress={props.onPress}
    >
      <CardView style={[props.style, styles.touchableCardView]}>
        {props.children}
      </CardView>
    </TouchableHighlight>
  );
}
