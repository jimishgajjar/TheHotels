import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import SearchScreen from "../screens/SearchScreen";

describe("SearchScreen", () => {
  test("renders correctly and handles interactions", async () => {
    render(<SearchScreen />);

    // Check if the header text is rendered
    expect(screen.getByText("Search Hotels Here")).toBeTruthy();

    // Check if date pickers are present
    expect(screen.getByPlaceholderText("Select start date")).toBeTruthy();
    expect(screen.getByPlaceholderText("Select end date")).toBeTruthy();

    // Check if search input and button are present
    expect(screen.getByPlaceholderText("Enter location")).toBeTruthy();
    expect(screen.getByText("Search")).toBeTruthy();

    // Simulate filling in location input
    fireEvent.changeText(
      screen.getByPlaceholderText("Enter location"),
      "New York"
    );
    expect(screen.getByPlaceholderText("Enter location").props.value).toBe(
      "New York"
    );

    // Simulate pressing the "Search" button
    fireEvent.press(screen.getByText("Search"));

    // Check if the recommended hotels section is present
    expect(screen.getByText("Recommended Hotels")).toBeTruthy();

    // Check if recommended hotels data is rendered
    expect(screen.getByText("Hotel X")).toBeTruthy();
    expect(
      screen.getByText("Luxurious hotel with great amenities")
    ).toBeTruthy();
  });
});
