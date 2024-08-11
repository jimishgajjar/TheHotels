import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import AccountScreen from "../screens/AccountScreen";
import "@testing-library/jest-native/extend-expect";

// Mock the navigation prop
const mockNavigation = {
  navigate: jest.fn(),
};

// Mock the Zustand store
jest.mock("../store", () => ({
  __esModule: true,
  default: () => ({
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      mobile: "1234567890",
    },
    setUser: jest.fn(),
  }),
}));

describe("AccountScreen", () => {
  test("renders correctly and handles logout", () => {
    render(<AccountScreen navigation={mockNavigation} />);

    // Check if the screen renders user details
    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("john.doe@example.com")).toBeTruthy();
    expect(screen.getByText("1234567890")).toBeTruthy();

    // Simulate pressing the logout button
    fireEvent.press(screen.getByText("Logout"));

    // Check if the navigation function was called with "SigninScreen"
    expect(mockNavigation.navigate).toHaveBeenCalledWith("SigninScreen");
  });
});
