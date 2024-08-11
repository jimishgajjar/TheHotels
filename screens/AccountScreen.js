import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useStore } from "zustand";
import { useNavigation } from "@react-navigation/native";
import UserPic from "../assets/images/user.jpg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import globalStore from "../store";

const { width: screenWidth } = Dimensions.get("window");

const AccountScreen = () => {
  const { user, setUser } = useStore(globalStore);
  const navigation = useNavigation();

  const handleLogout = () => {
    setUser(null);
    navigation.navigate("SigninScreen"); // Redirect to SigninScreen after logout
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileInfo}>
          <Image source={UserPic} style={styles.profileImage} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.mobile}>{user.mobile}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 15,
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  profileInfo: {
    backgroundColor: "#1c1c1c",
    alignItems: "center",
    marginBottom: 32,
    width: "100%",
    borderRadius: 10,
    padding: 20,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 24,
  },
  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 6,
  },
  mobile: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 6,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff4d4d",
    paddingVertical: 14,
    marginBottom: 20,
    width: screenWidth - 30,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
});

export default AccountScreen;
