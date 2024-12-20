import { pause } from "../pause.js";

describe("the pause function", () => {
  it("resolves after the specified duration", async () => {
    const duration = 100;

    const start = Date.now();
    await pause(duration);
    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(duration - 1);
  });

  it("does not take significantly longer than the specified duration", async () => {
    const duration = 100;

    const start = Date.now();
    await pause(duration);
    const end = Date.now();

    expect(end - start).toBeLessThan(duration + 50);
  });
});
