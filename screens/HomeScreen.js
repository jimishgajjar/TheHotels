import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "zustand";
import TourImg from "../assets/images/tour.jpg";
import globalStore from "../store";

const { height: screenHeight } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const { rooms, setRooms } = useStore(globalStore);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://192.168.0.161:3000/rooms");
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleBookNow = (room) => {
    navigation.navigate("BookingScreen", { room });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.experiencesContainer}>
        <Text style={styles.experiencesHeader}>
          Top experiences on TheHotels
        </Text>
        <Text style={styles.experiencesSubHeader}>
          The best tours, activities and tickets
        </Text>

        <View style={styles.experiencesList}>
          {rooms.map((room, index) => (
            <View style={styles.experienceItem} key={index}>
              <Image source={TourImg} style={styles.experienceImage} />
              <Text style={styles.experienceTag}>BEST SELLER</Text>
              <View style={styles.experienceTextContainer}>
                <Text style={styles.experienceText}>{room.name}</Text>
                <Text style={styles.experiencePrice}>${room.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => handleBookNow(room)}
              >
                <Text style={styles.bookButtonText}>Buy Room Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight,
    backgroundColor: "#000",
    padding: 20,
  },
  experiencesContainer: {
    backgroundColor: "#000",
  },
  experiencesHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  experiencesSubHeader: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 20,
  },
  experiencesList: {
    flexDirection: "column",
  },
  experienceItem: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    height: 350,
    marginBottom: 20,
  },
  experienceImage: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },
  experienceTag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#000",
    color: "#fff",
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  experienceTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#000",
  },
  experienceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  experiencePrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  bookButton: {
    backgroundColor: "#84e9bd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "stretch", // Make button full width
    alignItems: "center", // Center text inside button
  },
  bookButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
