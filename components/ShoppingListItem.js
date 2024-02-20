import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { setDoc, getDoc, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const ShoppingListItem = ({
  productName,
  initialQty,
  initialUnitPrice,
  auth,
}) => {
  const [qty, setQty] = useState(initialQty.toString());
  const [unitPrice, setUnitPrice] = useState(initialUnitPrice.toString());

  useEffect(() => {
    const updateDocument = async () => {
      try {
        await setDoc(doc(db, "shoppingList", productName), {
          productName: productName,
          unitPrice: unitPrice,
          qty: qty,
          user: auth.currentUser.uid,
        });
      } catch (error) {
        console.error("Error updating document:", error);
      }
    };

    updateDocument();
  }, [productName, unitPrice, qty]);

  const handleQtyChange = (text) => {
    setQty(text);
  };

  const handleUnitPriceChange = (text) => {
    setUnitPrice(text);
  };

  const handleRemoveItem = async () => {
    try {
      await deleteDoc(doc(db, "shoppingList", productName));
      deleteDoc(
        doc(db, "shoppingList", productName + "-" + auth.currentUser.uid)
      );
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <View style={styles.item}>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>{productName}</Text>
        <Button mode="outlined" onPress={handleRemoveItem}>
          <Ionicons name="trash" />
        </Button>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="Price"
          placeholderTextColor="#a9a9a9"
          value={unitPrice}
          onChangeText={handleUnitPriceChange}
        />
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="Quantity"
          placeholderTextColor="#a9a9a9"
          value={qty}
          onChangeText={handleQtyChange}
        />
      </View>
      <View style={styles.actionButtonsContainer}>
        <Button style={styles.actionButton}>
          <Text style={styles.actionButtonText}>-</Text>
        </Button>
        <Button style={styles.actionButton}>
          <Text style={styles.actionButtonText}>+</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "navy",
    padding: 10,
    borderRadius: 20,
  },
  rowContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    marginVertical: 4,
  },
  label: {
    color: "#fff",
    marginHorizontal: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  textInput: {
    borderColor: "#001f3f",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 1,
    height: 40,
    color: "#fff",
    width: "50%",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  actionButton: {
    backgroundColor: "#4FC4D6",
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
    borderRadius: 5,
  },
  actionButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
  },
});

export default ShoppingListItem;
