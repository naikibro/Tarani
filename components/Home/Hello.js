import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  StatusBar,
  Image,
  Pressable,
  Animated,
  Button,
  Platform,
  Keyboard,
  SafeAreaView,
} from "react-native";

const Hello = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("./../../assets/logo.png")}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Hello;
