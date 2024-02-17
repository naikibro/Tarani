import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { BottomNavigation, Text } from "react-native-paper";

const ShoppingListScreen = () => {
  const [user, setUser] = useState(null);

  // Authentication state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe; // Cleanup on component unmount
  }, []);

  return (
    <>
      <Text>Hello</Text>
    </>
  );
};

export default ShoppingListScreen;
