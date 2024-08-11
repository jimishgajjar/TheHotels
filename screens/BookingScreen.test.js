import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import BookingScreen from "../screens/BookingScreen";

// Mock navigation and route props
const mockNavigation = {
  navigate: jest.fn(),
};
const mockRoute = {
  params: {
    room: { name: "Deluxe Room" },
  },
};

// Mock Zustand store
jest.mock("../store", () => ({
  __esModule: true,
  default: () => ({
    user: { id: 1, name: "John Doe" },
  }),
}));

// Mock the database
jest.mock("../database", () => ({
  write: jest.fn((callback) => callback()),
  get: jest.fn(() => ({
    create: jest.fn((callback) => callback({})),
  })),
}));

describe("BookingScreen", () => {
  test("renders correctly and handles interactions", () => {
    render(<BookingScreen navigation={mockNavigation} route={mockRoute} />);

    // Check if the screen renders correctly
    expect(screen.getByText("Booking Details")).toBeTruthy();
    expect(screen.getByText("Deluxe Room")).toBeTruthy();

    // Check if Confirm Booking button is present
    expect(screen.getByText("Confirm Booking")).toBeTruthy();

    // Simulate pressing the Confirm Booking button
    fireEvent.press(screen.getByText("Confirm Booking"));

    // Check if navigation to "Bookings" screen is called
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Bookings");
  });
});
