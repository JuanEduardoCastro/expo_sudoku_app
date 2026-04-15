import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { fireEvent, render } from "@testing-library/react-native";

const baseProps = {
  visible: true,
  title: "Are you Sure?",
  acceptOnPress: jest.fn(),
  cancelOnPress: jest.fn(),
};

describe("ConfirmationModal", () => {
  it("renders the title", () => {
    const { getByText } = render(<ConfirmationModal {...baseProps} />);

    expect(getByText("Are you Sure?")).toBeTruthy();
  });

  it("renders content text when isFinishedModal is false", () => {
    const { getByText } = render(
      <ConfirmationModal {...baseProps} content={"This will delete everything."} />,
    );

    expect(getByText("This will delete everything.")).toBeTruthy();
  });

  it("render score, time and errors when isFinishedModal is true", () => {
    const { getByText } = render(
      <ConfirmationModal
        {...baseProps}
        isFinishedModal
        finishedData={{ score: 320, timer: 90, errors: 1 }}
      />,
    );

    expect(getByText("320")).toBeTruthy();
    expect(getByText("01:30")).toBeTruthy();
    expect(getByText("1")).toBeTruthy();
  });

  it("calls acceptOnPress when the accept button is pressed", () => {
    const mockAccept = jest.fn();
    const { getByText } = render(
      <ConfirmationModal {...baseProps} acceptText={"Confirm"} acceptOnPress={mockAccept} />,
    );

    fireEvent.press(getByText("Confirm"));

    expect(mockAccept).toHaveBeenCalledTimes(1);
  });

  it("calls cancelOnPress when the cancel button is pressed", () => {
    const mockCancel = jest.fn();
    const { getByText } = render(
      <ConfirmationModal {...baseProps} cancelText={"Cancel"} cancelOnPress={mockCancel} />,
    );

    fireEvent.press(getByText("Cancel"));

    expect(mockCancel).toHaveBeenCalledTimes(1);
  });

  it("does not render cancel button when isFinishedModal is null", () => {
    const { queryByText } = render(<ConfirmationModal {...baseProps} cancelText={null} />);

    expect(queryByText("Cancel")).toBeNull();
  });
});
