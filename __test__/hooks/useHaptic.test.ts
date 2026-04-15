import useHaptic from "@/hooks/useHaptic";
import { settingsService } from "@/store/dbServices";
import { act, renderHook } from "@testing-library/react-native";
import * as Haptics from "expo-haptics";

jest.mock("expo-haptics", () => ({
  ImpactFeedbackStyle: { Heavy: "Heavy", Medium: "Medium" },
  impactAsync: jest.fn(),
}));

jest.mock("@/store/dbServices", () => ({
  settingsService: {
    get: jest.fn(),
    set: jest.fn(),
  },
}));

const mockGet = settingsService.get as jest.Mock;
const mockSet = settingsService.set as jest.Mock;
const mockImpact = Haptics.impactAsync as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  mockGet.mockResolvedValue(null);
});

describe("useHaptic", () => {
  it("defaults vibEnabled to true when no stored value", async () => {
    const { result } = renderHook(() => useHaptic());

    await act(async () => {});

    expect(result.current.vibEnabled).toBe(true);
  });

  it("loads vibEnabled=false from settingsService on mount", async () => {
    mockGet.mockResolvedValue("false");

    const { result } = renderHook(() => useHaptic());
    await act(async () => {});

    expect(result.current.vibEnabled).toBe(false);
  });

  it("calls Haptics.impactAsync when vibEnabled is true and Heavy haptic fires", async () => {
    const { result } = renderHook(() => useHaptic());

    await act(async () => {});

    act(() => {
      result.current.onClickHapticHeavy();
    });

    expect(mockImpact).toHaveBeenCalledTimes(1);
    expect(mockImpact).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Heavy);
  });

  it("does NOT call Haptics when vibEnabled is false", async () => {
    mockGet.mockResolvedValue("false");

    const { result } = renderHook(() => useHaptic());

    await act(async () => {});

    act(() => {
      result.current.onClickHapticHeavy();
    });

    expect(mockImpact).not.toHaveBeenCalled();
  });

  it("calls Haptics with Medium style for onClickHapticMedium", async () => {
    const { result } = renderHook(() => useHaptic());
    await act(async () => {});

    act(() => {
      result.current.onClickHapticMedium();
    });

    expect(mockImpact).toHaveBeenCalledTimes(1);
  });

  it("persists new value vie settingsService.set when vibEnabled is called", async () => {
    const { result } = renderHook(() => useHaptic());
    await act(async () => {});

    act(() => {
      result.current.setVibEnabled(false);
    });

    expect(mockSet).toHaveBeenCalledWith("vibEnabled", "false");
    expect(result.current.vibEnabled).toBe(false);
  });
});
