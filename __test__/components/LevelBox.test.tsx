import LevelBox from "@/components/levels/LevelBox";
import { LEVEL_UNLOCK_GAMES } from "@/constants/levels";
import { fireEvent, render } from "@testing-library/react-native";

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockHapticHeavy = jest.fn();
jest.mock("@/hooks/useHaptic", () => ({
  __esModule: true,
  default: () => ({ onClickHapticHeavy: mockHapticHeavy }),
}));

let mockScoresByLevels: { level: number; totalGames: number }[] = [];
jest.mock("@/store/store_zustand", () => ({
  useGameScoresStore: () => ({ scoresByLevels: mockScoresByLevels }),
}));

const setScores = (totalGamesByLevel: Record<number, number>) => {
  mockScoresByLevels = [1, 2, 3, 4].map((level) => ({
    level,
    totalGames: totalGamesByLevel[level] ?? 0,
  }));
};

const unlockedText = new RegExp(`Complete ${LEVEL_UNLOCK_GAMES} games to unlock`);

describe("LevelBox", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setScores({});
  });

  it("renders all four dificulty levels", () => {
    const { getByText } = render(<LevelBox />);

    expect(getByText("Easy")).toBeTruthy();
    expect(getByText("Medium")).toBeTruthy();
    expect(getByText("Hard")).toBeTruthy();
    expect(getByText("Expert")).toBeTruthy();
  });

  it("navigates to Easy on press since it is never locked", () => {
    const { getByText } = render(<LevelBox />);

    fireEvent.press(getByText("Easy"));

    expect(mockPush).toHaveBeenCalledWith({ pathname: "/Game", params: { level: 1 } });
  });

  it("shows the locked note on Hard and Expert with zero prior completions", () => {
    const { getAllByText } = render(<LevelBox />);

    expect(getAllByText(unlockedText)).toHaveLength(2);
  });

  it("marks locked levels in accessibility metadata", () => {
    const { getByLabelText } = render(<LevelBox />);

    expect(getByLabelText("Hard difficulty, locked")).toBeTruthy();
    expect(getByLabelText("Easy difficulty")).toBeTruthy();
  });

  it("blocks navigation and reports the locked level instead", () => {
    const onLockedPress = jest.fn();
    const { getByText } = render(<LevelBox onLockedPress={onLockedPress} />);

    fireEvent.press(getByText("Hard"));

    expect(mockPush).not.toHaveBeenCalled();
    expect(onLockedPress).toHaveBeenCalledWith(3);
    expect(mockHapticHeavy).toHaveBeenCalled();
  });

  it("unlocks Hard once Medium has enough completed games", () => {
    setScores({ 2: LEVEL_UNLOCK_GAMES });
    const onLockedPress = jest.fn();
    const { getByText } = render(<LevelBox onLockedPress={onLockedPress} />);

    fireEvent.press(getByText("Hard"));

    expect(onLockedPress).not.toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith({ pathname: "/Game", params: { level: 3 } });
  });

  it("keeps Expert locked on Hard completions alone, regardless of Medium", () => {
    setScores({ 2: 10, 3: 0 });
    const onLockedPress = jest.fn();
    const { getByText } = render(<LevelBox onLockedPress={onLockedPress} />);

    fireEvent.press(getByText("Expert"));

    expect(onLockedPress).toHaveBeenCalledWith(4);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("prioritizes the lock check over the saved-game warning", () => {
    const onDisabledPress = jest.fn();
    const onLockedPress = jest.fn();
    const { getByText } = render(
      <LevelBox onDisabledPress={onDisabledPress} onLockedPress={onLockedPress} />,
    );

    fireEvent.press(getByText("Hard"));

    expect(onLockedPress).toHaveBeenCalledWith(3);
    expect(onDisabledPress).not.toHaveBeenCalled();
  });

  it("still triggers the saved-game warning on an unlocked level", () => {
    const onDisabledPress = jest.fn();
    const { getByText } = render(
      <LevelBox hasSavedGame={true} onDisabledPress={onDisabledPress} />,
    );

    fireEvent.press(getByText("Easy"));

    expect(onDisabledPress).toHaveBeenCalledWith(1);
    expect(mockPush).not.toHaveBeenCalled();
  });
});
