import { formatDate } from "./date";

describe("formatDate", () => {
  test("formats the date string correctly", () => {
    const date = "2023-08-30";
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("August 30, 2023");
  });

  test("handles invalid date strings", () => {
    const date = "invalid-date";
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("Invalid Date");
  });

  test("formats the date string with different locale", () => {
    const date = "2023-12-25";
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("December 25, 2023");
  });
});
