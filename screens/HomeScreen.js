import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import globalStore from "../store";
import MapboxGL from "@rnmapbox/maps";

MapboxGL.setAccessToken(
  "sk.eyJ1IjoiYWtoaWwtMjUwNyIsImEiOiJjbHpxMGxmMWkxNzk5Mmtwd2ZhNHlnc2Y3In0.6w2rSnmQMUpacYXtBNVUJQ"
);

const latitude = 43.5248564;
const longitude = -79.8709313;

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const { rooms, setRooms } = globalStore();

  function handleBookNow(room) {
    navigation.navigate("BookingScreen", { room });
  }

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const snapshot = await firestore().collection("rooms").get();
        const roomsResponse = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setRooms(roomsResponse);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [setRooms]);

  const loadingSkeleton = (
    <View style={styles.screenContainer}>
      <View style={styles.mapWrapper}>
        <Animated.View style={[styles.mapStyle, styles.skeletonBackground]} />
      </View>

      <View style={styles.experiencesSection}>
        <Animated.View style={[styles.sectionHeader, styles.skeletonText]} />
        <Animated.View style={[styles.sectionSubHeader, styles.skeletonText]} />

        <View style={styles.experiencesList}>
          {[...Array(3)].map((_, index) => (
            <View style={styles.experienceCard} key={index}>
              <Animated.View
                style={[styles.experienceImage, styles.skeletonBackground]}
              />
              <Animated.View
                style={[styles.experienceBadge, styles.skeletonText]}
              />
              <View style={styles.experienceInfo}>
                <Animated.View
                  style={[styles.experienceTitle, styles.skeletonText]}
                />
                <Animated.View
                  style={[styles.experiencePrice, styles.skeletonText]}
                />
              </View>
              <Animated.View
                style={[styles.bookingButton, styles.skeletonBackground]}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  if (loading) {
    return loadingSkeleton;
  }

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.mapWrapper}>
        <MapboxGL.MapView style={styles.mapStyle}>
          <MapboxGL.Camera
            zoomLevel={10}
            centerCoordinate={[longitude, latitude]}
          />
          <MapboxGL.PointAnnotation
            id="marker1"
            coordinate={[longitude, latitude]}
          >
            <View style={styles.markerContainer}>
              <View style={styles.markerIcon} />
            </View>
          </MapboxGL.PointAnnotation>
        </MapboxGL.MapView>
      </View>

      <View style={styles.experiencesSection}>
        <Text style={styles.sectionHeader}>Top experiences on TheHotels</Text>
        <Text style={styles.sectionSubHeader}>
          The best tours, activities, and tickets
        </Text>

        <View style={styles.experiencesList}>
          {rooms.map((room, index) => (
            <View style={styles.experienceCard} key={index}>
              <Image
                source={{ uri: room.imageUri }}
                style={styles.experienceImage}
              />
              <Text style={styles.experienceBadge}>BEST SELLER</Text>
              <View style={styles.experienceInfo}>
                <Text style={styles.experienceTitle}>{room.name}</Text>
                <Text style={styles.experiencePrice}>${room.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.bookingButton}
                onPress={() => handleBookNow(room)}
              >
                <Text style={styles.bookingButtonText}>Buy Room Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  mapWrapper: {
    height: screenHeight * 0.4,
    width: screenWidth - 40,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  mapStyle: {
    flex: 1,
  },
  markerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  markerIcon: {
    width: 30,
    height: 30,
    backgroundColor: "#84e9bd",
    borderRadius: 15,
  },
  experiencesSection: {
    paddingBottom: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  sectionSubHeader: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 20,
  },
  experiencesList: {
    flexDirection: "column",
  },
  experienceCard: {
    borderRadius: 10,
    overflow: "hidden",
    height: 350,
    marginBottom: 20,
  },
  experienceImage: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  experienceBadge: {
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
  experienceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#000",
  },
  experienceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  experiencePrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  bookingButton: {
    backgroundColor: "#84e9bd",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  bookingButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
  },
  skeletonBackground: {
    backgroundColor: "#444",
    opacity: 0.6,
  },
  skeletonText: {
    backgroundColor: "#444",
    color: "transparent",
    borderRadius: 5,
  },
});

export default HomeScreen;
