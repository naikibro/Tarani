import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppRegistry } from "react-native";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  ImageBackground,
  StyleSheet,
  View,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";

// Import icons
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";

const Tab = createBottomTabNavigator();

// Main App component
export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "tomato",
      secondary: "yellow",
    },
  };

  const [user, setUser] = useState(null);
  // Authentication state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe; // Cleanup on component unmount
  }, []);

  const LogOutButton = () => <Button title="Logout" onPress={signOut(auth)} />;
  // Render UI
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Shopping") {
                iconName = focused ? "cart" : "cart-outline";
              } else if (route.name === "Signup") {
                iconName = focused ? "person" : "person-outline";
              } else if (route.name === "Logout") {
                iconName = focused ? "log-out" : "log-out-outline";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "navy",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              display: "flex",
              backgroundColor: "white",
              padding: 5,
            },
          })}
        >
          {user ? (
            <>
              <Tab.Screen
                name="Shopping"
                component={ShoppingListScreen}
                options={{ headerShown: false }}
              />
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Tarani", headerShown: false }}
              />
              <Tab.Screen name="Logout" component={LogOutButton} />
            </>
          ) : (
            <>
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Tarani", headerShown: false }}
              />
              <Tab.Screen
                name="Signup"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
