import NumberPad from "@/components/grid/NumberPad";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

describe("NumberPad", () => {
  it("renders all 9 number buttons", () => {
    const { getByText } = render(<NumberPad onPress={jest.fn()} />);

    for (let i = 1; i <= 9; i++) {
      expect(getByText(String(i))).toBeTruthy();
    }
  });

  it("calls onPress with the correct number when a button is pressed", () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<NumberPad onPress={mockOnPress} />);

    fireEvent.press(getByText("5"));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith(5);
  });

  it("dows NOT call onPress for a number in completedNumbers", () => {
    const mockOnPress = jest.fn();
    const completed = new Set([3]);
    const { getByText } = render(<NumberPad onPress={mockOnPress} completedNumbers={completed} />);

    fireEvent.press(getByText("3"));

    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it("still calls onPress for numbers NOT in completedNumbers", () => {
    const mockOnPress = jest.fn();
    const completed = new Set([3]);
    const { getByText } = render(<NumberPad onPress={mockOnPress} completedNumbers={completed} />);

    fireEvent.press(getByText("7"));

    expect(mockOnPress).toHaveBeenCalledWith(7);
  });
});
