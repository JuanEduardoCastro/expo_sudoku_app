import LevelStatCard from "@/components/stats/LevelStatCard";
import { fireEvent, render } from "@testing-library/react-native";

const mockStats = {
  name: "Easy",
  maxPoints: 1200,
  bestTime: 95,
  totalGames: 10,
  streak: 3,
  level: 1,
};

describe("LevelStatsCard", () => {
  it("renders the level name", () => {
    const { getByText } = render(<LevelStatCard levelStats={mockStats} levelColor={"#99F6E4"} />);

    expect(getByText("Easy")).toBeTruthy();
  });

  it("show max points in collapsed state", () => {
    const { getByText } = render(<LevelStatCard levelStats={mockStats} levelColor={"#99F6E4"} />);

    expect(getByText("Best 1,200")).toBeTruthy();
  });

  it("expands to show detailed stats when pressed", () => {
    const { getByText, queryByText } = render(
      <LevelStatCard levelStats={mockStats} levelColor={"#99F6E4"} />,
    );

    expect(queryByText("Best time")).toBeNull();

    fireEvent.press(getByText("Easy"));

    expect(getByText("Best time")).toBeTruthy();
    expect(getByText("Max points")).toBeTruthy();
    expect(getByText("Games")).toBeTruthy();
    expect(getByText("Streak")).toBeTruthy();
  });

  it("shows formatted bestTime when expanded", () => {
    const { getByText } = render(<LevelStatCard levelStats={mockStats} levelColor={"#99F6E4"} />);

    fireEvent.press(getByText("Easy"));

    expect(getByText("01:35 m")).toBeTruthy();
  });

  it("shows -- for bestTime when it is 0", () => {
    const { getByText } = render(
      <LevelStatCard levelStats={{ ...mockStats, bestTime: 0 }} levelColor={"#99F6E4"} />,
    );

    fireEvent.press(getByText("Easy"));
    expect(getByText("--")).toBeTruthy();
  });

  it("collapses back when pressed a second time", () => {
    const { getByText, queryByText } = render(
      <LevelStatCard levelStats={mockStats} levelColor={"#99F6E4"} />,
    );

    fireEvent.press(getByText("Easy"));
    fireEvent.press(getByText("Easy"));
    expect(queryByText("Best time")).toBeNull();
  });
});
