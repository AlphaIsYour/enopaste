import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cn, formatDate, formatViews, generateSlug, getExpiryDate,
  getExpiryLabel, isExpired,
} from "../utils";

const now = new Date(2026, 0, 15, 12, 0, 0);

beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(now); });
afterEach(() => { vi.useRealTimers(); });

describe("formatDate", () => {
  it.each([
    [0, "just now"], [59, "just now"], [60, "1m ago"],
    [3599, "59m ago"], [3600, "1h ago"], [86399, "23h ago"],
    [86400, "1d ago"], [6 * 86400, "6d ago"],
  ])("formats a date %i seconds ago", (seconds, expected) => {
    const date = new Date(now.getTime() - seconds * 1000);
    expect(formatDate(date)).toBe(expected);
    expect(formatDate(date.toISOString())).toBe(expected);
  });
  it("switches to a calendar date at seven days", () => {
    expect(formatDate(new Date(2026, 0, 8, 12))).toBe("Jan 8, 2026");
  });
});

describe("formatViews", () => {
  it.each([
    [0, "0"], [999, "999"], [1000, "1.0K"], [1250, "1.3K"],
    [999999, "1000.0K"], [1000000, "1.0M"], [2500000, "2.5M"],
  ])("formats %i views", (count, expected) => {
    expect(formatViews(count)).toBe(expected);
  });
});

describe("expiry", () => {
  it("does not expire null, a future date, or the exact deadline", () => {
    expect(isExpired(null)).toBe(false);
    expect(isExpired(new Date(now.getTime() + 1))).toBe(false);
    expect(isExpired(new Date(now))).toBe(false);
  });
  it("expires immediately after the deadline", () => {
    expect(isExpired(new Date(now.getTime() - 1))).toBe(true);
  });
  it.each([
    [null, "Never"], [600, "10 minutes"], [3600, "1 hour"],
    [86400, "1 day"], [604800, "1 week"], [2592000, "1 month"],
    [123, "Custom"],
  ])("labels %s seconds", (seconds, expected) => {
    expect(getExpiryLabel(seconds)).toBe(expected);
  });
  it("leaves unlimited lifetime as null", () => {
    expect(getExpiryDate(null)).toBeNull();
  });
  it.each([0, 600, 3600, 86400])("adds %i seconds to the current time", (seconds) => {
    expect(getExpiryDate(seconds)?.getTime()).toBe(now.getTime() + seconds * 1000);
    expect(Date.now()).toBe(now.getTime());
  });
});

it("combines conditional and nested class values", () => {
  expect(cn("base", false, null, undefined, { active: true, hidden: false }, ["nested"]))
    .toBe("base active nested");
});

it("generates eight-character URL-safe slugs without collisions in a small sample", () => {
  const slugs = Array.from({ length: 128 }, () => generateSlug());
  for (const slug of slugs) expect(slug).toMatch(/^[A-Za-z0-9_-]{8}$/);
  expect(new Set(slugs).size).toBe(slugs.length);
});
