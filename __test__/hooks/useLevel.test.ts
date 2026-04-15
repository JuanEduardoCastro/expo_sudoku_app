import useLevel from "@/hooks/useLevel";
import { renderHook } from "@testing-library/react-native";

describe("useLevel", () => {
  it("returns correct config for level 1 (Easy)", () => {
    const { result } = renderHook(() => useLevel(1));

    expect(result.current.levelString).toBe("Easy");
    expect(result.current.difficulty).toBe(0.54);
    expect(result.current.clueCount).toBe(3);
    expect(result.current.scoreMultiply).toBe(24);
  });

  it("returns correct config for level 2 (Medium)", () => {
    const { result } = renderHook(() => useLevel(2));

    expect(result.current.levelString).toBe("Medium");
    expect(result.current.difficulty).toBe(0.6);
    expect(result.current.clueCount).toBe(2);
    expect(result.current.scoreMultiply).toBe(40);
  });
  it("returns correct config for level 3 (Hard)", () => {
    const { result } = renderHook(() => useLevel(3));

    expect(result.current.levelString).toBe("Hard");
    expect(result.current.difficulty).toBe(0.65);
    expect(result.current.clueCount).toBe(1);
    expect(result.current.scoreMultiply).toBe(80);
  });
  it("returns correct config for level 4 (Expert)", () => {
    const { result } = renderHook(() => useLevel(4));

    expect(result.current.levelString).toBe("Expert");
    expect(result.current.difficulty).toBe(0.7);
    expect(result.current.clueCount).toBe(1);
    expect(result.current.scoreMultiply).toBe(150);
  });
});
