import useTimer from "@/hooks/useTimer";
import { act, renderHook } from "@testing-library/react-native";

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

describe("useTimer", () => {
  it("starts with timer at 0 and not running", () => {
    const { result } = renderHook(() => useTimer());

    expect(result.current.timer).toBe(0);
    expect(result.current.timerRunning).toBe(false);
  });

  it("does not increment when timerRunning is false", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.timer).toBe(0);
  });

  it("increments when timerRunning is true", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.setTimerRunning(true);
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.timer).toBe(3);
  });

  it("stops incrementing shen timerRunning is set back to false", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.setTimerRunning(true);
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    act(() => {
      result.current.setTimerRunning(false);
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.timer).toBe(2);
  });

  it("increments timerMultiply after every 30 seconds", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.setTimerRunning(true);
    });

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    expect(result.current.timerMultiply).toBe(1);

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    expect(result.current.timerMultiply).toBe(2);
  });
});

describe("formatTimer", () => {
  it("formats 0 as 00:00", () => {
    const { result } = renderHook(() => useTimer());

    expect(result.current.formatTimer(0)).toBe("00:00");
  });

  it("pads single digit seconds", () => {
    const { result } = renderHook(() => useTimer());

    expect(result.current.formatTimer(5)).toBe("00:05");
  });

  it("formats 65 seconds as 01:05", () => {
    const { result } = renderHook(() => useTimer());

    expect(result.current.formatTimer(65)).toBe("01:05");
  });

  it("format 3600 as 60:00", () => {
    const { result } = renderHook(() => useTimer());

    expect(result.current.formatTimer(3600)).toBe("60:00");
  });
});
