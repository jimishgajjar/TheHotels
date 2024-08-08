import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useStore } from "zustand";
import globalStore from "../store";

const AccountScreen = () => {
  const { user, setUser } = useStore(globalStore);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: "https://example.com/profile-pic.jpg" }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.joined}>Joined in 2024</Text>
          <Text style={styles.contributions}>0 contributions</Text>
          <Text style={styles.description}>
            Share a little about yourself so other travellers can get to know
            you!
          </Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>📍 No city selected.</Text>
            <Text style={styles.infoText}>🔗 No website added.</Text>
          </View>
        </View>
        <View style={styles.photoSection}>
          <Text style={styles.photoSectionTitle}>0 photos</Text>
          <Text style={styles.photoSectionSubtitle}>
            You have no photos yet.
          </Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload a photo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  contentContainer: {
    padding: 16,
    alignItems: "center",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 32,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  joined: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 2,
  },
  contributions: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 16,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  infoContainer: {
    alignItems: "center",
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  photoSection: {
    alignItems: "center",
  },
  photoSectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  photoSectionSubtitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: "#444",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AccountScreen;
