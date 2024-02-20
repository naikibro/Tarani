import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import { setDoc, getDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase";

const AddItem = ({ method, auth }) => {
  const [productName, setProductName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  const handleProductNameChange = (text) => {
    setProductName(text);
    console.log("a1.pnc");
  };

  const handleQtyChange = (text) => {
    setQty(text);
    console.log("a2.qtc");
  };

  const handlePriceChange = (text) => {
    setPrice(text);
    console.log("a3.prc");
  };

  const handleSubmit = async () => {
    try {
      console.log("a4.setDoc start");

      const uniqueIdentifier = productName + "-" + auth.currentUser.uid;
      const product = await setDoc(doc(db, "shoppingList", productName), {
        productName: productName,
        unitPrice: price,
        qty: qty,
        user: auth.currentUser.uid,
      });
      setProductName("");
      setQty("");
      setPrice("");
      console.log("a4.setDoc end", product);
      method();
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={method}>
      <View style={styles.addItemContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>Add a product</Text>
          <Button onPress={method} title="X" />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Product Name"
          onChangeText={handleProductNameChange}
          value={productName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Price"
          keyboardType="numeric"
          onChangeText={handlePriceChange}
          value={price}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Quantity"
          keyboardType="numeric"
          onChangeText={handleQtyChange}
          value={qty}
        />
        <Button onPress={handleSubmit} title="Submit" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  addItemContainer: {
    width: "100%",
    backgroundColor: "navy",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
  textInput: {
    borderColor: "#001f3f",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 1,
    height: 40,
    color: "#fff",
    marginBottom: 10,
  },
});

export default AddItem;
