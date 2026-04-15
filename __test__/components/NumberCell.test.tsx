import { CellProps } from "@/app/Game";
import NumberCell from "@/components/grid/NumberCell";
import { fireEvent, render } from "@testing-library/react-native";

const makeCell = (overrides: Partial<CellProps> = {}): CellProps => ({
  row: 0,
  col: 0,
  value: null,
  editable: true,
  ...overrides,
});

describe("NumberCell", () => {
  it("renders the cell value when it has one", () => {
    const { getByText } = render(<NumberCell cell={makeCell({ value: 7 })} onPress={jest.fn()} />);

    expect(getByText("7")).toBeTruthy();
  });

  it("renders empty when value is null", () => {
    const { queryByText } = render(
      <NumberCell cell={makeCell({ value: null })} onPress={jest.fn()} />,
    );

    for (let i = 1; i <= 9; i++) {
      expect(queryByText(String(i))).toBeNull();
    }
  });

  it("calls onPress with the correct cell when pressed", () => {
    const mockOnPress = jest.fn();
    const cell = makeCell({ row: 3, col: 4, value: 2 });
    const { getByText } = render(<NumberCell cell={cell} onPress={mockOnPress} />);

    fireEvent.press(getByText("2"));

    expect(mockOnPress).toHaveBeenCalledWith(cell);
  });
});
