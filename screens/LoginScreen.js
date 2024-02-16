import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  StatusBar,
  Pressable,
  Animated,
  Button,
  SafeAreaView,
} from "react-native";

// Firebase imports
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  // State hooks for user input and user data
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Form validation state
  const [isFormValid, setIsFormValid] = useState(false);

  // Input focus state
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Effect hook for form validation
  useEffect(() => {
    setIsFormValid(mail.trim() !== "" && password.trim() !== "");
  }, [mail, password]);

  // Authentication state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe; // Cleanup on component unmount
  }, []);

  // Event handlers for input fields
  const handleMailInput = (value) => setMail(value);
  const handlePasswordInput = (value) => setPassword(value);

  const inputFocusAnimatedValue = new Animated.Value(0);

  // Login user function
  const loginUser = async () => {
    if (!isFormValid) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        mail,
        password
      );
      setUser(userCredential.user);
      console.log("User connected", userCredential);
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  // Animated background color based on input focus
  const animatedBackgroundColor = inputFocusAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0.2)", "rgba(241, 115, 0, 0.5)"], // Background color values
  });

  // Focus and Blur handlers for inputs using Animated API
  const handleFocus = () => {
    Animated.timing(inputFocusAnimatedValue, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false, // backgroundColor does not support native animation
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(inputFocusAnimatedValue, {
      toValue: 0,
      duration: 900,
      useNativeDriver: false, // backgroundColor does not support native animation
    }).start();
  };
  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Text>Welcome {user.displayName || "User"}!</Text>
          <Pressable
            onPress={() => signOut(auth).then(() => setUser(null))}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "blue" : "navy",
              },
              styles.button,
            ]}
          >
            <Text style={styles.buttonText}>Log out</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 40,
            }}
          >
            Tarani
          </Text>

          <Animated.View
            style={[
              styles.loginForm,
              { backgroundColor: animatedBackgroundColor }, // Apply animated background color here
            ]}
          >
            <TextInput
              value={mail}
              onChangeText={handleMailInput}
              onFocus={handleFocus}
              onEndEditing={handleBlur}
              placeholder="Email"
              style={styles.input}
            />
            <TextInput
              value={password}
              onChangeText={handlePasswordInput}
              onFocus={handleFocus}
              onEndEditing={handleBlur}
              placeholder="Password"
              secureTextEntry
              style={styles.input}
            />
            <Pressable
              onPress={loginUser}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "blue" : "navy",
                },
                styles.button,
              ]}
              disabled={!isFormValid}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <Pressable
              style={styles.link}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.linkText}>
                No account yet ? Create an account here
              </Text>
            </Pressable>
          </Animated.View>
        </>
      )}
      <Button title="debug" onPress={() => console.log("user => ", user)} />
    </View>
  );
};

// StyleSheet for styling the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    // Android shadow property
    elevation: 5,
  },
  loginForm: {
    width: 250,
    marginVertical: 40,
    padding: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    color: "white",
  },
  loginFormFocused: {
    backgroundColor: "rgba(150, 0, 0, 1)",
  },
  input: {
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 2,
    marginVertical: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "navy",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
  },
  linkText: {
    color: "#000",
  },
});

export default LoginScreen;
