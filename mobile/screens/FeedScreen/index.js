import * as React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text>Home</Text>
    </View>
  );
}

FeedScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
