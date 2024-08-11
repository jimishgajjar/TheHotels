import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import SigninScreen from "../screens/SigninScreen"; // Adjust the import path as needed

describe("SigninScreen", () => {
  test("renders correctly and handles login", async () => {
    render(<SigninScreen />);

    // Check if the screen renders the title
    expect(screen.getByText("Welcome Back!")).toBeTruthy();

    // Check if the login button is present
    expect(screen.getByText("Login")).toBeTruthy();

    // Simulate user input
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "test@example.com"
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Password"),
      "password123"
    );

    // Simulate pressing the login button
    fireEvent.press(screen.getByText("Login"));

    // Add further assertions or mocks as needed
  });
});
