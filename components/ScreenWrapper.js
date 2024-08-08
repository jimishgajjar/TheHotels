import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header";

const ScreenWrapper = ({ children, title }) => {
  return (
    <View style={styles.container}>
      <Header title={title} />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default ScreenWrapper;
