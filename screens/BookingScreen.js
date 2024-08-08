import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useStore } from "zustand";
import globalStore from "../store";

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { room } = route.params;

  // Access user data and setUser function from Zustand store
  const { user, setUser } = useStore(globalStore);

  const [persons, setPersons] = useState([{ id: 1, name: "", age: "" }]);
  const [children, setChildren] = useState([{ id: 1, name: "", age: "" }]);
  const [lastPersonId, setLastPersonId] = useState(1);
  const [lastChildId, setLastChildId] = useState(1);

  const handleAddPerson = () => {
    const newId = lastPersonId + 1;
    setLastPersonId(newId);
    setPersons([...persons, { id: newId, name: "", age: "" }]);
  };

  const handleRemovePerson = () => {
    if (persons.length > 1) {
      const updatedPersons = [...persons];
      updatedPersons.pop(); // Remove the last person
      setPersons(updatedPersons);
    }
  };

  const handleAddChild = () => {
    const newId = lastChildId + 1;
    setLastChildId(newId);
    setChildren([...children, { id: newId, name: "", age: "" }]);
  };

  const handleRemoveChild = () => {
    if (children.length > 1) {
      const updatedChildren = [...children];
      updatedChildren.pop(); // Remove the last child
      setChildren(updatedChildren);
    }
  };

  const handleNameChange = (text, id, type, field) => {
    if (type === "person") {
      const updatedPersons = persons.map((person) =>
        person.id === id ? { ...person, [field]: text } : person
      );
      setPersons(updatedPersons);
    } else if (type === "child") {
      const updatedChildren = children.map((child) =>
        child.id === id ? { ...child, [field]: text } : child
      );
      setChildren(updatedChildren);
    }
  };

  const handleConfirmBooking = () => {
    // Prepare adults and children details from state
    const adultsDetails = persons.map((person) => ({
      type: "adult",
      name: person.name,
      age: person.age,
    }));
    const childrenDetails = children.map((child) => ({
      type: "child",
      name: child.name,
      age: child.age,
    }));

    // Combine adults and children into one array
    const allPersons = [...adultsDetails, ...childrenDetails];

    // Prepare booking details object
    const bookingDetails = {
      room: room.name,
      persons: allPersons, // Combined array of adults and children
    };

    // Update user's bookings in state
    const updatedUser = {
      ...user,
      bookings: [...(user.bookings || []), bookingDetails],
    };
    setUser(updatedUser); // Update user state with new bookings

    console.log("User updated:", updatedUser);
    navigation.navigate("Bookings");
  };

  // Function to validate numeric input for age
  const handleAgeChange = (text, id, type) => {
    const regex = /^[0-9\b]+$/;
    if (regex.test(text)) {
      handleNameChange(text, id, type, "age");
    }
    // You can add additional handling or feedback for non-numeric input if needed
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#000" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.bookingHeader}>Booking Details</Text>
        <Text style={styles.roomName}>{room.name}</Text>

        <Text style={styles.sectionHeader}>Adults</Text>
        {persons.map((person, index) => (
          <View key={person.id} style={styles.personContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.nameInput]}
                placeholder={`Enter person ${index + 1}'s name`}
                value={person.name}
                onChangeText={(text) =>
                  handleNameChange(text, person.id, "person", "name")
                }
              />
              <TextInput
                style={[styles.input, styles.ageInput]}
                placeholder="Age"
                keyboardType="numeric"
                value={person.age}
                onChangeText={(text) =>
                  handleAgeChange(text, person.id, "person")
                }
              />
            </View>
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddPerson}>
            <Icon name="plus" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleRemovePerson}
          >
            <Icon name="minus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeader}>Children</Text>
        {children.map((child, index) => (
          <View key={child.id} style={styles.personContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.nameInput]}
                placeholder={`Enter child ${index + 1}'s name`}
                value={child.name}
                onChangeText={(text) =>
                  handleNameChange(text, child.id, "child", "name")
                }
              />
              <TextInput
                style={[styles.input, styles.ageInput]}
                placeholder="Age"
                keyboardType="numeric"
                value={child.age}
                onChangeText={(text) =>
                  handleAgeChange(text, child.id, "child")
                }
              />
            </View>
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddChild}>
            <Icon name="plus" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleRemoveChild}
          >
            <Icon name="minus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmBooking}
      >
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  bookingHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  roomName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
  personContainer: {
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  nameInput: {
    marginBottom: 10,
    flex: 1,
  },
  ageInput: {
    marginBottom: 10,
    width: 60, // Adjust width as needed
    borderRadius: 5,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#84e9bd",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 20,
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#84e9bd",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "stretch",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  confirmButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookingScreen;
