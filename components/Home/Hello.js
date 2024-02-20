import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import ConfettiCannon from "react-native-confetti-cannon";

const Hello = () => {
  const [isConfetti, setConfetti] = useState(true);
  const [user, setUser] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false); // State to manage flip status

  const heart = () => {};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      console.log("User is authenticated!");
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              setIsFlipped(!isFlipped); // Toggle flip status on press
              heart();
            }}
          >
            <Image
              source={require("./../../assets/dinobig.png")}
              style={[
                styles.dinoImage,
                isFlipped && { transform: [{ scaleX: -1 }] },
              ]} // Apply flip if isFlipped is true
            />
          </TouchableOpacity>

          <View style={styles.messageContainer}>
            <Text style={{ color: "navy" }}>
              Welcome to <Text style={{ fontWeight: "bold" }}>Tarani</Text> your
              economy application
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={{ color: "navy", textAlign: "justify" }}>
              Don't hesitate to create new shopping lists !{"\n\n"}
              You can add items to your groceries list (with price and quantity){" "}
              {"\n\n"} The total price of your shopping cart is automatically
              calculated at the bottom of the page
            </Text>
          </View>
        </View>
      </ScrollView>

      {isConfetti && (
        <>
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 0 }}
            autoStart
            onAnimationEnd={() => setConfetti(false)}
          />
          <ConfettiCannon
            count={200}
            origin={{ x: 500, y: 0 }}
            autoStart
            onAnimationEnd={() => setConfetti(false)}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: 40,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dinoImage: {
    width: 300,
    height: 300,
  },
  messageContainer: {
    backgroundColor: "white",
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    borderColor: "navy",
    borderWidth: 2,
    width: "80%",
  },
  descriptionContainer: {
    backgroundColor: "white",
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    borderColor: "navy",
    borderWidth: 2,
    width: "80%",
  },
});

export default Hello;
