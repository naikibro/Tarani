import React, { useEffect, useState } from "react";
import {
  View,
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
import ShoppingListScreen from "./ShoppingListScreen";
import Hello from "../components/Home/Hello";

import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  // Authentication state listener
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/6.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      />

      <Pressable
        style={styles.fullScreenPressable}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        {user ? (
          <>
            <Hello></Hello>
          </>
        ) : (
          <LoginScreen navigation={navigation} />
        )}
      </Pressable>
      <StatusBar style="auto" />
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
