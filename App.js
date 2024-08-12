import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import AccountScreen from "./screens/AccountScreen";
import UserBookings from "./screens/UserBookings";
import ScreenWrapper from "./components/ScreenWrapper";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import BookingScreen from "./screens/BookingScreen";
import seedRoomsData from "./utils/seedFirbaseData";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "HomeScreen") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Search") {
          iconName = focused ? "search" : "search-outline";
        } else if (route.name === "Account") {
          iconName = focused ? "person" : "person-outline";
        } else if (route.name === "Bookings") {
          iconName = focused ? "book" : "book-outline";
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: "500",
      },
      tabBarStyle: {
        height: 70,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        backgroundColor: "black",
      },
      tabBarActiveTintColor: "#84e9bd",
      tabBarInactiveTintColor: "white",
      headerShown: false,
    })}
  >
    <Tab.Screen
      name="HomeScreen"
      children={() => (
        <ScreenWrapper title="Explore">
          <HomeScreen />
        </ScreenWrapper>
      )}
    />
    <Tab.Screen
      name="Search"
      children={() => (
        <ScreenWrapper title="Search">
          <SearchScreen />
        </ScreenWrapper>
      )}
    />
    <Tab.Screen
      name="Bookings"
      children={() => (
        <ScreenWrapper title="Your Bookings">
          <UserBookings />
        </ScreenWrapper>
      )}
    />
    <Tab.Screen
      name="Account"
      children={() => (
        <ScreenWrapper title="Account">
          <AccountScreen />
        </ScreenWrapper>
      )}
    />
  </Tab.Navigator>
);

const App = () => {
  // useEffect(() => {
  //   const initializeDatabase = async () => {
  //     console.log("*************");
  //     await seedRoomsData();
  //     console.log("*************");
  //   };

  //   initializeDatabase();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SigninScreen">
        <Stack.Screen
          name="MainTabNavigator"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SigninScreen"
          component={SigninScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
