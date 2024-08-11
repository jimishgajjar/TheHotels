import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import HomeScreen from "../screens/HomeScreen";

// Mock navigation and store
const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock("@react-native-firebase/firestore", () => ({
  collection: jest.fn(() => ({
    get: jest.fn(() => ({
      docs: [
        {
          id: "1",
          data: () => ({
            name: "Deluxe Room",
            price: 120,
            imageUri: "http://example.com/image.jpg",
          }),
        },
      ],
    })),
  })),
}));

jest.mock("../store", () => ({
  __esModule: true,
  default: () => ({
    rooms: [],
    setRooms: jest.fn(),
  }),
}));

describe("HomeScreen", () => {
  test("renders correctly and handles interactions", async () => {
    render(<HomeScreen navigation={mockNavigation} />);

    // Check if loading skeleton is rendered initially
    expect(screen.getByTestId("loading-skeleton")).toBeTruthy();

    // Wait for the data to be fetched and screen to update
    await screen.findByText("Top experiences on TheHotels");

    // Check if room data is rendered
    expect(screen.getByText("Deluxe Room")).toBeTruthy();
    expect(screen.getByText("$120")).toBeTruthy();

    // Check if "Buy Room Now" button is present
    expect(screen.getByText("Buy Room Now")).toBeTruthy();

    // Simulate pressing the "Buy Room Now" button
    fireEvent.press(screen.getByText("Buy Room Now"));

    // Check if navigation to "BookingScreen" is called with correct params
    expect(mockNavigation.navigate).toHaveBeenCalledWith("BookingScreen", {
      room: {
        name: "Deluxe Room",
        price: 120,
        imageUri: "http://test.com/image.jpg",
      },
    });
  });
});
