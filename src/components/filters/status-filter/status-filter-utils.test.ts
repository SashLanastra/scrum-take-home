import { describe, expect, it } from "vitest";
import { EStatus } from "../../../api/assets";

/**
 * Unit tests for StatusFilter utility functions
 * These test the pure logic functions that could be extracted from the component
 */

describe("StatusFilter Utils", () => {
  describe("Status Selection Logic", () => {
    it("should add status to empty array", () => {
      const currentStatuses: EStatus[] = [];
      const statusToAdd = EStatus.ACTIVE;

      const result = currentStatuses.includes(statusToAdd)
        ? currentStatuses.filter((s) => s !== statusToAdd)
        : [...currentStatuses, statusToAdd];

      expect(result).toEqual([EStatus.ACTIVE]);
      expect(result.length).toBe(1);
    });

    it("should add status to existing array", () => {
      const currentStatuses = [EStatus.ACTIVE];
      const statusToAdd = EStatus.PENDING;

      const result = currentStatuses.includes(statusToAdd)
        ? currentStatuses.filter((s) => s !== statusToAdd)
        : [...currentStatuses, statusToAdd];

      expect(result).toEqual([EStatus.ACTIVE, EStatus.PENDING]);
      expect(result.length).toBe(2);
    });

    it("should remove status from array when already present", () => {
      const currentStatuses = [EStatus.ACTIVE, EStatus.PENDING];
      const statusToRemove = EStatus.ACTIVE;

      const result = currentStatuses.includes(statusToRemove)
        ? currentStatuses.filter((s) => s !== statusToRemove)
        : [...currentStatuses, statusToRemove];

      expect(result).toEqual([EStatus.PENDING]);
      expect(result.length).toBe(1);
    });

    it("should not modify original array", () => {
      const originalStatuses = [EStatus.ACTIVE];
      const statusToAdd = EStatus.PENDING;

      const result = originalStatuses.includes(statusToAdd)
        ? originalStatuses.filter((s) => s !== statusToAdd)
        : [...originalStatuses, statusToAdd];

      // Original array should not be modified
      expect(originalStatuses).toEqual([EStatus.ACTIVE]);
      expect(result).toEqual([EStatus.ACTIVE, EStatus.PENDING]);
    });
  });

  describe("Status Removal Logic", () => {
    it("should remove specific status from array", () => {
      const currentStatuses = [EStatus.ACTIVE, EStatus.PENDING, EStatus.LIQUIDATED];
      const statusToRemove = EStatus.PENDING;

      const result = currentStatuses.filter((s) => s !== statusToRemove);

      expect(result).toEqual([EStatus.ACTIVE, EStatus.LIQUIDATED]);
      expect(result).not.toContain(EStatus.PENDING);
    });

    it("should return empty array when removing last status", () => {
      const currentStatuses = [EStatus.ACTIVE];
      const statusToRemove = EStatus.ACTIVE;

      const result = currentStatuses.filter((s) => s !== statusToRemove);

      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });

    it("should return same array when status not present", () => {
      const currentStatuses = [EStatus.ACTIVE, EStatus.PENDING];
      const statusToRemove = EStatus.LIQUIDATED;

      const result = currentStatuses.filter((s) => s !== statusToRemove);

      expect(result).toEqual([EStatus.ACTIVE, EStatus.PENDING]);
      expect(result.length).toBe(2);
    });
  });

  describe("Select All Logic", () => {
    it("should return all enum values", () => {
      const allStatuses = Object.values(EStatus);

      expect(allStatuses).toHaveLength(3);
      expect(allStatuses).toContain(EStatus.ACTIVE);
      expect(allStatuses).toContain(EStatus.PENDING);
      expect(allStatuses).toContain(EStatus.LIQUIDATED);
    });

    it("should replace current selection with all statuses", () => {
      const currentStatuses = [EStatus.ACTIVE];
      const allStatuses = Object.values(EStatus);

      // Select all should replace, not merge
      expect(allStatuses).not.toEqual(currentStatuses);
      expect(allStatuses.length).toBeGreaterThan(currentStatuses.length);
    });
  });

  describe("Reset/Clear Logic", () => {
    it("should return empty array", () => {
      const currentStatuses = [EStatus.ACTIVE, EStatus.PENDING, EStatus.LIQUIDATED];
      const result: EStatus[] = [];

      expect(result).toEqual([]);
      expect(result.length).toBe(0);
      expect(currentStatuses.length).toBeGreaterThan(result.length);
    });
  });

  describe("Status Checking Logic", () => {
    it("should return true when status is in array", () => {
      const selectedStatuses = [EStatus.ACTIVE, EStatus.PENDING];
      const statusToCheck = EStatus.ACTIVE;

      const isSelected = selectedStatuses.includes(statusToCheck);

      expect(isSelected).toBe(true);
    });

    it("should return false when status is not in array", () => {
      const selectedStatuses = [EStatus.ACTIVE, EStatus.PENDING];
      const statusToCheck = EStatus.LIQUIDATED;

      const isSelected = selectedStatuses.includes(statusToCheck);

      expect(isSelected).toBe(false);
    });

    it("should return false for empty array", () => {
      const selectedStatuses: EStatus[] = [];
      const statusToCheck = EStatus.ACTIVE;

      const isSelected = selectedStatuses.includes(statusToCheck);

      expect(isSelected).toBe(false);
    });
  });

  describe("Status Item Transformation", () => {
    it("should transform enum to item object", () => {
      const status = EStatus.ACTIVE;
      const item = {
        id: status,
        name: status,
      };

      expect(item.id).toBe(EStatus.ACTIVE);
      expect(item.name).toBe("ACTIVE");
    });

    it("should transform all statuses to item objects", () => {
      const statuses = Object.values(EStatus);
      const items = statuses.map((status) => ({
        id: status,
        name: status,
      }));

      expect(items).toHaveLength(3);
      items.forEach((item, index) => {
        expect(item.id).toBe(statuses[index]);
        expect(item.name).toBe(statuses[index]);
      });
    });

    it("should transform selected statuses to item objects", () => {
      const selectedStatuses = [EStatus.ACTIVE, EStatus.PENDING];
      const selectedItems = selectedStatuses.map((status) => ({
        id: status,
        name: status,
      }));

      expect(selectedItems).toHaveLength(2);
      expect(selectedItems[0].id).toBe(EStatus.ACTIVE);
      expect(selectedItems[1].id).toBe(EStatus.PENDING);
    });
  });

  describe("Edge Cases", () => {
    it("should handle duplicate prevention", () => {
      const currentStatuses = [EStatus.ACTIVE];
      const statusToAdd = EStatus.ACTIVE;

      // Logic should prevent duplicates
      const result = currentStatuses.includes(statusToAdd)
        ? currentStatuses.filter((s) => s !== statusToAdd)
        : [...currentStatuses, statusToAdd];

      // Should remove, not add duplicate
      expect(result).toEqual([]);
    });

    it("should handle empty string casting", () => {
      const itemId = "ACTIVE";
      const status = itemId as EStatus;

      expect(status).toBe(EStatus.ACTIVE);
      expect([EStatus.ACTIVE]).toContain(status);
    });

    it("should handle type casting from item", () => {
      const item = {
        id: "PENDING",
        name: "PENDING",
      };

      const status = item.id as EStatus;

      expect(status).toBe(EStatus.PENDING);
      expect(Object.values(EStatus)).toContain(status);
    });
  });
});
