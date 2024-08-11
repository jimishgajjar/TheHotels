import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useStore } from "zustand";
import firestore from "@react-native-firebase/firestore";
import globalStore from "../store"; // Adjust the path as per your project structure
import TourImg from "../assets/images/tour.jpg";
import database from "../database"; // Import your database instance

const UserBookings = () => {
  const [roomBookings, setRoomBookings] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useStore(globalStore);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const snapshot = await firestore().collection("rooms").get();
        const rooms = snapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data();
          return acc;
        }, {});
        setRoomDetails(rooms);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setError("Unable to fetch room details");
      }
    };

    const loadUserBookings = async () => {
      try {
        const bookings = await database.get("bookings").query().fetch();
        const userBookings = bookings.filter(
          (booking) => booking.userId === user.id
        );
        setRoomBookings(userBookings);
      } catch (error) {
        console.error("Error fetching bookings for user:", error);
        setError("Unable to fetch bookings for the user");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchRoomDetails();
      loadUserBookings();
    }
  }, []);

  const renderBookingItem = ({ item }) => {
    if (!item._raw || !item._raw.room_id || !roomDetails[item._raw.room_id]) {
      return (
        <View style={styles.bookingItem}>
          <Text style={styles.errorText}>Room details not available</Text>
        </View>
      );
    }

    const roomData = roomDetails[item._raw.room_id];
    return (
      <View style={styles.bookingItem}>
        <Image
          source={{ uri: roomData.imageUri }}
          style={styles.bookingImage}
        />
        <View style={styles.bookingDetails}>
          <Text style={styles.roomType}>{roomData.name}</Text>
          {item.persons &&
            item.persons.map((person, index) => (
              <Text key={index} style={styles.personDetails}>
                {person.type === "adult" ? "Adult: " : "Child: "}
                {person.name} ({person.age})
              </Text>
            ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Bookings</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : roomBookings.length === 0 ? (
        <Text style={styles.noBookingsText}>No bookings found</Text>
      ) : (
        <FlatList
          data={roomBookings}
          renderItem={renderBookingItem}
          keyExtractor={(item, index) => index.toString()}
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
  errorText: {
    fontSize: 16,
    color: "red",
  },
  noBookingsText: {
    fontSize: 16,
    color: "#888",
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
  personDetails: {
    fontSize: 16,
  },
});

export default UserBookings;
