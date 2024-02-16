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
  Dimensions,
} from "react-native";
import LoginScreen from "./LoginScreen";
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/bg2.png")}
        resizeMode="stretch"
        style={styles.backgroundImage}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always"
      >
        <Pressable
          style={styles.fullScreenPressable}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <LoginScreen navigation={navigation}></LoginScreen>
        </Pressable>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
};

// StyleSheet for styling the components
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default HomeScreen;
