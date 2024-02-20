import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  StyleSheet,
  Keyboard,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { setDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const EditItemModal = ({
  visible,
  toggleModal,
  id,
  initialProductName,
  productName,
  unitPrice,
  qty,
  setProductName,
  handleUnitPriceChange,
  handleQtyChange,
  updateDocument,
}) => {
  useEffect(() => {
    if (!visible) {
      updateDocument();
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Edit Item</Text>
        <TextInput
          style={styles.textInput}
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.textInput}
          value={unitPrice}
          onChangeText={handleUnitPriceChange}
        />
        <TextInput
          style={styles.textInput}
          value={qty}
          onChangeText={handleQtyChange}
        />
        <Button onPress={toggleModal}>Close</Button>
      </View>
    </Modal>
  );
};

const ShoppingListItem = ({
  id,
  initialProductName,
  initialQty,
  initialUnitPrice,
  auth,
}) => {
  const [productName, setProductName] = useState(initialProductName.toString());
  const [qty, setQty] = useState(initialQty.toString());
  const [unitPrice, setUnitPrice] = useState(initialUnitPrice.toString());
  const [isModalVisible, setIsModalVisible] = useState(false);

  const updateDocument = async () => {
    try {
      const docRef = doc(db, "shoppingList", id); // Use the provided ID
      await setDoc(docRef, {
        productName: productName,
        unitPrice: unitPrice,
        qty: qty,
        user: auth.currentUser.uid,
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleQtyChange = (text) => {
    setQty(text);
  };

  const handleUnitPriceChange = (text) => {
    setUnitPrice(text);
  };

  const handleRemoveItem = async () => {
    try {
      await deleteDoc(doc(db, "shoppingList", id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const toggleModal = () => {
    Keyboard.dismiss(); // Dismiss keyboard when modal is closed
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.item}>
      <View style={styles.rowContainer} onPress={toggleModal}>
        <TouchableOpacity>
          <Text style={styles.label}>{productName}</Text>
        </TouchableOpacity>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={{
              marginHorizontal: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text style={{ color: "#ccc", textAlign: "left" }}>
              {unitPrice} xpf
            </Text>
            <Text style={{ color: "#ccc", textAlign: "left" }}>
              {qty} units
            </Text>
          </View>

          <Button mode="outlined" onPress={handleRemoveItem}>
            <Ionicons name="trash" />
          </Button>
        </View>
      </View>

      <EditItemModal
        visible={isModalVisible}
        toggleModal={toggleModal}
        id={id}
        productName={productName}
        initialProductName={initialProductName}
        unitPrice={unitPrice}
        qty={qty}
        setProductName={setProductName}
        handleUnitPriceChange={handleUnitPriceChange}
        handleQtyChange={handleQtyChange}
        updateDocument={updateDocument}
      />
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
    alignItems: "center",
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
  textInput: {
    borderColor: "#001f3f",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginBottom: 20,
    width: "100%",
    color: "#fff", // Consistency in styles
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .1)",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff", // Consistency in styles
  },
});

export default ShoppingListItem;
