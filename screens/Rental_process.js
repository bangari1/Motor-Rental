import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5, Entypo } from "@expo/vector-icons";

export default function RentalProcess() {
  const steps = [
    { id: 1, icon: "calendar", color: "#fcbf49", text: "Select date & pickup location" },
    { id: 2, icon: "checkmark-done", color: "#4caf50", text: "Select from the list of bikes/scooters" },
    { id: 3, icon: "document-text", color: "#ef476f", text: "Submit KYC documents" },
    { id: 4, icon: "cash-outline", color: "#6a4c93", text: "Pay & book the bike" },
    { id: 5, icon: "bicycle-outline", color: "#00b4d8", text: "Enjoy the ride" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Easy Way To Setup Rental Process</Text>

      {steps.map((step, index) => (
        <View key={step.id} style={styles.stepContainer}>
          {/* Left timeline connector */}
          {index !== 0 && <View style={styles.connector} />}

          {/* Icon circle */}
          <View style={[styles.iconWrapper, { borderColor: step.color }]}>
            <Ionicons name={step.icon} size={20} color={step.color} />
          </View>

          {/* Step text */}
          <View style={[styles.textBox, { borderColor: step.color }]}>
            <Text style={styles.stepText}>{step.text}</Text>
          </View>

          {/* Right timeline connector */}
          {index !== steps.length - 1 && <View style={styles.connectorBottom} />}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    // textAlign: "center",
    width: "100%",
    marginBottom: 30,
  },
  stepContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 40,
  },
  iconWrapper: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  textBox: {
    marginLeft: 50,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1.5,
    borderStyle: "dashed",
    backgroundColor: "#fff",
    width: "80%",
  },
  stepText: {
    fontSize: 15,
  },
  connector: {
    position: "absolute",
    left: 20,
    top: -40,
    width: 2,
    height: 40,
    backgroundColor: "#ccc",
  },
  connectorBottom: {
    position: "absolute",
    left: 20,
    top: 40,
    width: 2,
    height: 40,
    backgroundColor: "#ccc",
  },
});
