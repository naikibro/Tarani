import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Modal, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, collection, query } from "firebase/firestore";
import AddItem from "../components/AddItem";
import ShoppingListItem from "../components/ShoppingListItem";

const ShoppingListScreen = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const q = query(collection(db, "shoppingList"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const productsData = snapshot.docs.map((doc) => {
          const product = doc.data();
          return {
            id: doc.id,
            ...product,
          };
        });
        setProducts(productsData);

        const newTotalPrice = productsData.reduce((total, product) => {
          const price = parseFloat(product.unitPrice);
          const qty = parseFloat(product.qty);

          if (!isNaN(price) && !isNaN(qty)) {
            const temp = price * qty;
            return total + temp;
          }
          return total;
        }, 0);

        setTotalPrice(newTotalPrice);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping list</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {products.map((product) => (
          <ShoppingListItem
            key={product.id}
            productName={product.productName}
            initialQty={product.qty}
            initialUnitPrice={product.unitPrice}
            auth={auth}
          />
        ))}
      </ScrollView>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <AddItem auth={auth} method={hideModal} />
        </View>
      </Modal>
      <View>
        <Text>Total price : {totalPrice} xpf</Text>
      </View>
      <Button mode="outlined" style={styles.addButton} onPress={showModal}>
        Add a product
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "red",
    marginBottom: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, .5)",
  },
  addButton: {
    marginTop: 30,
  },
});

export default ShoppingListScreen;
