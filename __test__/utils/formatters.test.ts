import { formatSeconds } from "@/utils/formatters";

describe("formatSeconds", () => {
  it("formats zero seconds as 00:00", () => {
    expect(formatSeconds(0)).toBe("00:00");
  });
});
