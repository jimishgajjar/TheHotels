import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useStore } from "zustand";
import globalStore from "../store"; // Adjust the path as per your project structure
import TourImg from "../assets/images/tour.jpg";

const RoomBookingsScreen = () => {
  const [roomBookings, setRoomBookings] = useState([]);
  const { user } = useStore(globalStore);

  useEffect(() => {
    // Fetch user bookings from globalStore
    if (user && user.bookings) {
      setRoomBookings(user.bookings);
    }
  }, [user]); // Listen for changes in user

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Image source={TourImg} style={styles.bookingImage} />
      <View style={styles.bookingDetails}>
        <Text style={styles.roomType}>{item.room}</Text>
        {item.persons &&
          item.persons.map((person, index) => (
            <Text key={index}>
              {person.type === "adult" ? "Adult: " : "Child: "}
              {person.name} ({person.age})
            </Text>
          ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Bookings</Text>
      {roomBookings.length === 0 ? (
        <Text>No bookings found</Text>
      ) : (
        <FlatList
          data={roomBookings}
          renderItem={renderBookingItem}
          keyExtractor={(item, index) => index.toString()} // Assuming no unique ID for bookings
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  list: {
    width: "100%",
  },
  bookingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookingImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  bookingDetails: {
    flex: 1,
  },
  roomType: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
});

export default RoomBookingsScreen;
