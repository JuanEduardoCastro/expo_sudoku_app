import { formatSeconds } from "@/utils/formatters";

describe("formatSeconds", () => {
  it("formats zero seconds as 00:00", () => {
    expect(formatSeconds(0)).toBe("00:00");
  });

  it("pads sigle-digit seconds", () => {
    expect(formatSeconds(5)).toBe("00:05");
  });

  it("formats exactly 60 seconds as 01:00", () => {
    expect(formatSeconds(60)).toBe("01:00");
  });

  it("formats exactly 90 seconds as 01:30", () => {
    expect(formatSeconds(90)).toBe("01:30");
  });

  it("formats sigle-digits minutes", () => {
    expect(formatSeconds(305)).toBe("05:05");
  });
});
