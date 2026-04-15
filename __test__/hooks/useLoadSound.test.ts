import useLoadSound from "@/hooks/useLoadSound";
import { settingsService } from "@/store/dbServices";
import { act, renderHook } from "@testing-library/react-native";
import { useAudioPlayer } from "expo-audio";

jest.mock("@/store/dbServices", () => ({
  settingsService: {
    get: jest.fn(),
    set: jest.fn(),
  },
}));

const mockGet = settingsService.get as jest.Mock;
const mockSet = settingsService.set as jest.Mock;

const mockPlay = jest.fn();
const mockSeekTo = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  (useAudioPlayer as jest.Mock).mockReturnValue({
    play: mockPlay,
    seekTo: mockSeekTo,
  });
});

describe("useLoadSound", () => {
  it("default soundEnabled to true", async () => {
    const { result } = renderHook(() => useLoadSound());

    await act(async () => {});

    expect(result.current.soundEnabled).toBe(true);
  });

  it("loads soundEnabled=false from settingsService on mount", async () => {
    mockGet.mockResolvedValue("false");

    const { result } = renderHook(() => useLoadSound());
    await act(async () => {});

    expect(result.current.soundEnabled).toBe(false);
  });

  it("calls seekTo(0) and play() when soundEnabled is true", async () => {
    mockGet.mockResolvedValue("true");

    const { result } = renderHook(() => useLoadSound());

    await act(async () => {});

    await act(async () => {
      result.current.playSound();
    });

    expect(mockSeekTo).toHaveBeenCalledWith(0);
    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  it("does NOT call play() when soundEnabled is false", async () => {
    mockGet.mockResolvedValue("false");

    const { result } = renderHook(() => useLoadSound());

    await act(async () => {});

    await act(async () => {
      result.current.playSound();
    });

    expect(mockPlay).not.toHaveBeenCalled();
  });

  it("presist new value via settingsService.set when setSoundEnabled is called", async () => {
    const { result } = renderHook(() => useLoadSound());
    await act(async () => {});

    await act(async () => {
      result.current.setSoundEnabled(false);
    });

    expect(mockSet).toHaveBeenCalledWith("soundEnabled", "false");
  });
});
