// React and React Native imports
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  StatusBar,
} from "react-native";

// Firebase imports
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// Main App component
export default function App() {
  // State hooks for user input and user data
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Form validation state
  const [isFormValid, setIsFormValid] = useState(false);

  // Effect hook for form validation
  useEffect(() => {
    setIsFormValid(
      username.trim() !== "" && mail.trim() !== "" && password.trim() !== ""
    );
  }, [username, mail, password]);

  // Authentication state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe; // Cleanup on component unmount
  }, []);

  // Event handlers for input fields
  const handleMailInput = (value) => setMail(value);
  const handleUsernameInput = (value) => setUsername(value);
  const handlePasswordInput = (value) => setPassword(value);

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

  // Create user function
  const createUser = async () => {
    if (!isFormValid) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        mail,
        password
      );
      setUser(userCredential.user);
      console.log("User created", userCredential);
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      console.log("Profile updated");
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    }
  };

  // Render UI
  return (
    <View style={styles.container}>
      <Text>My application</Text>
      {user ? (
        <View>
          <Text>Welcome {user.displayName || "User"}!</Text>
          <Button
            title="Log out"
            onPress={() => signOut(auth).then(() => setUser(null))}
          />
        </View>
      ) : (
        <View style={styles.loginForm}>
          <TextInput
            value={username}
            onChangeText={handleUsernameInput}
            placeholder="Username"
          />
          <TextInput
            value={mail}
            onChangeText={handleMailInput}
            placeholder="Email"
          />
          <TextInput
            value={password}
            onChangeText={handlePasswordInput}
            placeholder="Password"
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <Button onPress={loginUser} title="Login" disabled={!isFormValid} />
            <Button
              onPress={createUser}
              title="Sign up"
              disabled={!isFormValid}
            />
          </View>
        </View>
      )}
      <Button title="Debug" onPress={() => console.log("user", user)} />
      <StatusBar style="auto" />
    </View>
  );
}

// StyleSheet for styling the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginForm: {
    width: 250,
    marginVertical: 40,
    padding: 30,
    borderRadius: 15,
    backgroundColor: "gray",
    color: "white",
  },
  buttonContainer: {
    marginTop: 10,
  },
});
