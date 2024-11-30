import { joinFilePath, splitFilePath } from "../filePaths.js";
import { isPlatform } from "../platform.js";

vi.mock("../platform.js");

describe("within filePaths", () => {
  describe.concurrent("the joinFilePath function", () => {
    it("joins multiple path elements with forward slash on non-Windows platforms", async () => {
      vi.mocked(isPlatform).mockReturnValueOnce(false);

      const result = joinFilePath("folder", "subfolder", "file.txt");

      expect(result).toBe("folder/subfolder/file.txt");
    });

    it("joins multiple path elements with backslash on Windows platforms", async () => {
      vi.mocked(isPlatform).mockReturnValueOnce(true);

      const result = joinFilePath("folder", "subfolder", "file.txt");

      expect(result).toBe("folder\\subfolder\\file.txt");
    });

    it("returns an empty string when no path elements are provided", async () => {
      vi.mocked(isPlatform).mockReturnValueOnce(false);

      const result = joinFilePath();

      expect(result).toBe("");
    });

    it("returns the single path element joined when only one path element is provided", async () => {
      vi.mocked(isPlatform).mockReturnValueOnce(false);

      const result = joinFilePath("singlePathElement");

      expect(result).toBe("singlePathElement");
    });
  });

  describe.concurrent("the splitFilePath function", () => {
    it("splits Unix-like path into elements", async () => {
      vi.mocked(isPlatform).mockReturnValueOnce(false);

      const result = splitFilePath("folder/subfolder/file.txt");

      expect(result).toEqual(["folder", "subfolder", "file.txt"]);
    });

    it("splits Windows path into elements", async () => {
      vi.mocked(isPlatform).mockReturnValueOnce(true);

      const result = splitFilePath("folder\\subfolder\\file.txt");

      expect(result).toEqual(["folder", "subfolder", "file.txt"]);
    });

    it("returns an empty array for an empty string input", async () => {
      vi.mocked(isPlatform).mockReturnValueOnce(false);

      const result = splitFilePath("");

      expect(result).toEqual([]);
    });
  });
});
