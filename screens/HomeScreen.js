import React from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  ImageBackground,
  ScrollView,
  StatusBar,
  Keyboard,
} from "react-native";

import LoginScreen from "./LoginScreen";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      resizeMode="stretch"
      style={styles.backgroundImage}
    >
      <Pressable
        style={styles.fullScreenPressable}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <LoginScreen navigation={navigation}></LoginScreen>
        </ScrollView>
      </Pressable>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};

// StyleSheet for styling the components
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  fullScreenPressable: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default HomeScreen;
