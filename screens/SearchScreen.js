import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";

const SearchScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDateText, setStartDateText] = useState("");
  const [endDateText, setEndDateText] = useState("");

  const recommendedHotels = [
    {
      name: "Hotel X",
      imageUri:
        "https://cf.bstatic.com/xdata/images/hotel/square240/280627267.webp?k=338ec26dcf8d749747ccb7a6b0e8305b8bf5954ec46aba47d5fde838d6f7a266&o=",
      description: "Luxurious hotel with great amenities",
    },
    {
      name: "Hotel Y",
      imageUri:
        "https://cf.bstatic.com/xdata/images/hotel/square240/565281027.webp?k=0125b3f623e8a22d197f4e81aa4c4c514b38dbc9b45487734b6cbd1865cf822e&o=",
      description: "Comfortable stay with beautiful views",
    },
    {
      name: "Hotel Z",
      imageUri:
        "https://cf.bstatic.com/xdata/images/hotel/square240/48994973.webp?k=73f3a406e119ff5a630d8bd0e9f15b93f6c41cf703475ad680b042f47fc9066f&o=",
      description: "Affordable accommodation near city center",
    },
  ];

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
    setStartDateText(currentDate.toLocaleDateString());
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
    setEndDateText(currentDate.toLocaleDateString());
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  const handleSearch = () => {
    console.log("Searching with:", startDate, endDate, location);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Search Hotels Here</Text>
      </View>

      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={showStartDatePickerModal}
        >
          <Text style={styles.labelText}>Start Date:</Text>
          <TextInput
            style={[styles.input, { marginLeft: 10 }]}
            placeholder="Select start date"
            editable={false}
            value={startDateText}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.datePicker}
          onPress={showEndDatePickerModal}
        >
          <Text style={styles.labelText}>End Date:</Text>
          <TextInput
            style={[styles.input, { marginLeft: 10 }]}
            placeholder="Select end date"
            editable={false}
            value={endDateText}
          />
        </TouchableOpacity>
      </View>

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
        />
      )}

      <View style={styles.searchBar}>
        <FontAwesome name="map-marker" size={18} color="black" />
        <TextInput
          style={[styles.input, { marginLeft: 10 }]}
          placeholder="Enter location"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      <View style={styles.recommendedHotelsContainer}>
        <Text style={styles.sectionHeader}>Recommended Hotels</Text>
        {recommendedHotels.map((hotel, index) => (
          <View key={index} style={styles.hotelItem}>
            <Image source={{ uri: hotel.imageUri }} style={styles.hotelImage} />
            <View style={styles.hotelDetails}>
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <Text>{hotel.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  datePicker: {
    flex: 1,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  searchButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  recommendedHotelsContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  hotelItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  hotelImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  hotelDetails: {
    flex: 1,
  },
  hotelName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "black",
  },
  labelText: {
    color: "black",
  },
});

export default SearchScreen;
