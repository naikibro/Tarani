import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  StatusBar,
  Pressable,
  Button,
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

const SignUpScreen = ({ navigation }) => {
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
        <View style={styles.loginForm}>
          <TextInput
            value={username}
            onChangeText={handleUsernameInput}
            placeholder="Username"
            style={styles.input}
          />
          <TextInput
            value={mail}
            onChangeText={handleMailInput}
            placeholder="Email"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={handlePasswordInput}
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
          <Pressable
            onPress={createUser}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "blue" : "navy",
              },
              styles.button,
            ]}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
          <Pressable
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.linkText}>
              Already have an account ? Log in here
            </Text>
          </Pressable>
        </View>
      )}
      <Button title="debug" onPress={() => console.log("user => ", user)} />

      <Pressable
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>home</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
};

// StyleSheet for styling the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  loginForm: {
    width: 250,
    marginVertical: 40,
    padding: 30,
    borderRadius: 15,
    backgroundColor: "gray",
    color: "white",
  },
  input: {
    color: "white",
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
    color: "#46e4f2",
  },
});

export default SignUpScreen;
