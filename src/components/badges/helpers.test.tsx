import { describe, expect, it } from "vitest";
import { EStatus, EType } from "../../api/assets";
import { statusColors, typeColors } from "./helpers";

describe("Badge Helpers", () => {
  describe("statusColors", () => {
    it("should have color configuration for all status types", () => {
      const statuses = Object.values(EStatus);

      statuses.forEach((status) => {
        expect(statusColors[status]).toBeDefined();
      });
    });

    it("should have correct structure for ACTIVE status", () => {
      const active = statusColors[EStatus.ACTIVE];

      expect(active).toHaveProperty("backgroundColor");
      expect(active).toHaveProperty("color");
      expect(active).toHaveProperty("text");

      expect(active.backgroundColor).toBe("#10b981");
      expect(active.color).toBe("#ffffff");
      expect(active.text).toBe("Active");
    });

    it("should have correct structure for PENDING status", () => {
      const pending = statusColors[EStatus.PENDING];

      expect(pending.backgroundColor).toBe("#f59e0b");
      expect(pending.color).toBe("#ffffff");
      expect(pending.text).toBe("Pending");
    });

    it("should have correct structure for LIQUIDATED status", () => {
      const liquidated = statusColors[EStatus.LIQUIDATED];

      expect(liquidated.backgroundColor).toBe("#ef4444");
      expect(liquidated.color).toBe("#ffffff");
      expect(liquidated.text).toBe("Liquidated");
    });

    it("should use white text color for all statuses", () => {
      const statuses = Object.values(EStatus);

      statuses.forEach((status) => {
        expect(statusColors[status].color).toBe("#ffffff");
      });
    });

    it("should use valid hex colors", () => {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
      const statuses = Object.values(EStatus);

      statuses.forEach((status) => {
        expect(statusColors[status].backgroundColor).toMatch(hexColorRegex);
        expect(statusColors[status].color).toMatch(hexColorRegex);
      });
    });
  });

  describe("typeColors", () => {
    it("should have color configuration for all asset types", () => {
      const types = Object.values(EType);

      types.forEach((type) => {
        expect(typeColors[type]).toBeDefined();
      });
    });

    it("should have correct structure for STOCK type", () => {
      const stock = typeColors[EType.STOCK];

      expect(stock).toHaveProperty("backgroundColor");
      expect(stock).toHaveProperty("color");
      expect(stock).toHaveProperty("border");
      expect(stock).toHaveProperty("text");
      expect(stock).toHaveProperty("icon");

      expect(stock.backgroundColor).toBe("#E3F2FD");
      expect(stock.color).toBe("#1565C0");
      expect(stock.border).toBe("#2196F3");
      expect(stock.text).toBe("Stock");
    });

    it("should have correct structure for BOND type", () => {
      const bond = typeColors[EType.BOND];

      expect(bond.backgroundColor).toBe("#E0F2F1");
      expect(bond.color).toBe("#00695C");
      expect(bond.border).toBe("#009688");
      expect(bond.text).toBe("Bond");
    });

    it("should have correct structure for CRYPTO type", () => {
      const crypto = typeColors[EType.CRYPTO];

      expect(crypto.backgroundColor).toBe("#FFF3E0");
      expect(crypto.color).toBe("#E65100");
      expect(crypto.border).toBe("#FF9800");
      expect(crypto.text).toBe("Crypto");
    });

    it("should use valid hex colors for all types", () => {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
      const types = Object.values(EType);

      types.forEach((type) => {
        expect(typeColors[type].backgroundColor).toMatch(hexColorRegex);
        expect(typeColors[type].color).toMatch(hexColorRegex);
        expect(typeColors[type].border).toMatch(hexColorRegex);
      });
    });

    it("should have icons for all types", () => {
      const types = Object.values(EType);

      types.forEach((type) => {
        expect(typeColors[type].icon).toBeDefined();
        expect(typeColors[type].icon).not.toBeNull();
      });
    });

    it("should have unique colors for each type", () => {
      const backgroundColors = Object.values(EType).map((type) => typeColors[type].backgroundColor);
      const uniqueBackgrounds = new Set(backgroundColors);

      expect(uniqueBackgrounds.size).toBe(backgroundColors.length);
    });
  });

  describe("Color consistency", () => {
    it("should use different color schemes for status vs type", () => {
      // Status colors should be solid (darker) colors
      // Type colors should be lighter, pastel colors
      const statusBackgrounds = Object.values(EStatus).map(
        (status) => statusColors[status].backgroundColor,
      );
      const typeBackgrounds = Object.values(EType).map((type) => typeColors[type].backgroundColor);

      // All status backgrounds should start with lowercase hex
      statusBackgrounds.forEach((color) => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      });

      // All type backgrounds should start with uppercase hex
      typeBackgrounds.forEach((color) => {
        expect(color).toMatch(/^#[0-9A-F]{6}$/);
      });
    });

    it("should ensure no color overlap between statuses and types", () => {
      const allStatusColors = Object.values(EStatus).flatMap((status) => [
        statusColors[status].backgroundColor,
        statusColors[status].color,
      ]);

      const allTypeColors = Object.values(EType).flatMap((type) => [
        typeColors[type].backgroundColor,
        typeColors[type].color,
        typeColors[type].border,
      ]);

      // Since white (#ffffff) is used in status colors and might overlap,
      // we filter it out for this test
      const statusColorsWithoutWhite = allStatusColors.filter((c) => c !== "#ffffff");
      const typeColorsWithoutWhite = allTypeColors.filter((c) => c !== "#ffffff");

      const overlap = statusColorsWithoutWhite.some((color) =>
        typeColorsWithoutWhite.includes(color),
      );

      // This is informational - overlap is okay, but good to know about it
      expect(overlap).toBe(false);
    });
  });
});
