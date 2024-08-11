import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import SignupScreen from "../screens/SignupScreen";
import "@testing-library/jest-native/extend-expect";

// Mock the navigation prop
const mockNavigation = {
  replace: jest.fn(),
};

// Mock the database operations
jest.mock("../database/", () => ({
  write: jest.fn((callback) => callback()),
  get: jest.fn(() => ({
    create: jest.fn(() => Promise.resolve({})),
  })),
}));

describe("SignupScreen", () => {
  test("renders correctly and handles input changes", () => {
    render(<SignupScreen navigation={mockNavigation} />);

    // Check if the screen renders the title
    expect(screen.getByText("Create an Account")).toBeTruthy();

    // Simulate user input
    fireEvent.changeText(screen.getByPlaceholderText("Name"), "John Doe");
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "john.doe@example.com"
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Mobile Number"),
      "1234567890"
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Password"),
      "password123"
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Confirm Password"),
      "password123"
    );

    // Check if the inputs are updated
    expect(screen.getByPlaceholderText("Name").props.value).toBe("John Doe");
    expect(screen.getByPlaceholderText("Email").props.value).toBe(
      "john.doe@example.com"
    );
    expect(screen.getByPlaceholderText("Mobile Number").props.value).toBe(
      "1234567890"
    );
    expect(screen.getByPlaceholderText("Password").props.value).toBe(
      "password123"
    );
    expect(screen.getByPlaceholderText("Confirm Password").props.value).toBe(
      "password123"
    );

    // Simulate button press
    fireEvent.press(screen.getByText("Sign Up"));

    // Check if navigation was called with "SigninScreen"
    expect(mockNavigation.replace).toHaveBeenCalledWith("SigninScreen");
  });
});
