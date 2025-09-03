import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function BikeCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        <Text style={{ color: "red", fontWeight: "bold" }}>TVS</Text> | Ntorq
      </Text>
      <Image
        source={require("./assets/ntorq.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.price}>
        Starting from <Text style={{ fontWeight: "bold" }}>₹599/Day</Text>
      </Text>

      <View style={styles.features}>
        <View style={styles.featureItem}>
          <MaterialIcons
            name="account-balance-wallet"
            size={18}
            color="#00bfa6"
          />
          <Text style={styles.featureText}>Zero Deposit</Text>
        </View>
      </View> 

      <View style={{flexDirection:"row"}}>
      <TouchableOpacity style={styles.button1}>
        <Text style={styles.buttonText}>Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    // padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    width:350,
  },
  title: {
    fontSize: 16,
    // marginBottom: 10,
    textAlign:'center',
  },
  image: {
    width: "100%",
    height: 120,
    marginBottom: 10,
  },
  price: {
    fontSize: 14,
    color: "#000",
    marginBottom: 10,
    marginLeft:10,
  },
  features: {
    flexDirection: "row",
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginLeft:10,
  },
  featureText: {
    marginLeft: 5,
    color: "#00bfa6",
    fontSize: 14,
  },
  button1: {
    backgroundColor: "red",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    width:100,
    marginLeft:10,
  },
  button2: {
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    width:100,
    marginLeft:10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
