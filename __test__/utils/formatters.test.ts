import { formatSeconds } from "@/utils/formatters";

describe("formatSeconds", () => {
  it("formats zero seconds as 00:00 m", () => {
    expect(formatSeconds(0)).toBe("00:00 m");
  });

  it("pads sigle-digit seconds", () => {
    expect(formatSeconds(5)).toBe("00:05 m");
  });

  it("formats exactly 60 seconds as 01:00 m", () => {
    expect(formatSeconds(60)).toBe("01:00 m");
  });

  it("formats exactly 90 seconds as 01:30 m", () => {
    expect(formatSeconds(90)).toBe("01:30 m");
  });

  it("formats sigle-digits minutes", () => {
    expect(formatSeconds(305)).toBe("05:05 m");
  });
});
