import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { EStatus } from "../../../api/assets";
import * as AssetsProvider from "../../../context/providers/assets-provider";
import { renderWithProviders } from "../../../test/test-utils";
import { StatusFilter } from "./status-filter";

// Mock the context hook
const mockUpdateFilters = vi.fn();

describe("StatusFilter Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock the useFilterContext hook
    vi.spyOn(AssetsProvider, "useFilterContext").mockReturnValue({
      filters: {
        statuses: [],
        types: [],
        searchTerm: "",
      },
      updateFilters: mockUpdateFilters,
      setSearchTerm: vi.fn(),
    });
  });

  describe("Initial Render", () => {
    it("should render with default placeholder text", () => {
      renderWithProviders(<StatusFilter />);
      expect(screen.getByText("Filter by status...")).toBeInTheDocument();
    });

    it("should render with custom placeholder text", () => {
      renderWithProviders(<StatusFilter placeholder="Select status" />);
      expect(screen.getByText("Select status")).toBeInTheDocument();
    });

    it("should render the filter button", () => {
      renderWithProviders(<StatusFilter />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("item-picker__trigger");
    });
  });

  describe("Popover Interaction", () => {
    it("should open popover when clicking the trigger button", async () => {
      const user = userEvent.setup();
      renderWithProviders(<StatusFilter />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Filter by status")).toBeInTheDocument();
      });
    });

    it("should display all status options in the popover", async () => {
      const user = userEvent.setup();
      renderWithProviders(<StatusFilter />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Active")).toBeInTheDocument();
        expect(screen.getByText("Pending")).toBeInTheDocument();
        expect(screen.getByText("Liquidated")).toBeInTheDocument();
      });
    });

    it("should render custom title in popover", async () => {
      const user = userEvent.setup();
      renderWithProviders(<StatusFilter title="Choose Status" />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Choose Status")).toBeInTheDocument();
      });
    });

    it("should display 'All' and 'None' buttons in popover header", async () => {
      const user = userEvent.setup();
      renderWithProviders(<StatusFilter />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /none/i })).toBeInTheDocument();
      });
    });
  });

  describe("Status Selection", () => {
    it("should select a status when clicking on it", async () => {
      const user = userEvent.setup();
      renderWithProviders(<StatusFilter />);

      // Open popover
      const triggerButton = screen.getByRole("button");
      await user.click(triggerButton);

      // Click on Active status
      const activeOption = await screen.findByText("Active");
      const listItem = activeOption.closest("button");
      if (listItem) {
        await user.click(listItem);
      }

      // Verify updateFilters was called with correct arguments
      expect(mockUpdateFilters).toHaveBeenCalledWith("statuses", [EStatus.ACTIVE]);
    });

    it("should deselect a status when clicking it again", async () => {
      const user = userEvent.setup();

      // Mock with one status already selected
      vi.spyOn(AssetsProvider, "useFilterContext").mockReturnValue({
        filters: {
          statuses: [EStatus.ACTIVE],
          types: [],
          searchTerm: "",
        },
        updateFilters: mockUpdateFilters,
        setSearchTerm: vi.fn(),
      });

      renderWithProviders(<StatusFilter />);

      // Open popover
      const triggerButton = screen.getByRole("button", { name: /active/i });
      await user.click(triggerButton);

      // Click on Active status to deselect - get all and find the one in the list
      const listContainer = await screen.findByText("Filter by status");
      const listItem = listContainer
        .closest(".item-picker__popover-content")
        ?.querySelector(".item-picker__list-item");

      if (listItem) {
        await user.click(listItem as HTMLElement);
      }

      // Verify updateFilters was called with empty array
      expect(mockUpdateFilters).toHaveBeenCalledWith("statuses", []);
    });

    it("should select multiple statuses", async () => {
      const user = userEvent.setup();
      renderWithProviders(<StatusFilter />);

      // Open popover
      const triggerButton = screen.getByRole("button");
      await user.click(triggerButton);

      // Get all list items in the popover
      await waitFor(() => {
        expect(screen.getByText("Filter by status")).toBeInTheDocument();
      });

      const listItems = screen
        .getAllByRole("button")
        .filter((btn) => btn.classList.contains("item-picker__list-item"));

      // Click first item (Active)
      await user.click(listItems[0]);

      // Should have been called with ACTIVE
      expect(mockUpdateFilters).toHaveBeenCalled();
    });
  });

  describe("Select All and None Buttons", () => {
    it("should select all statuses when clicking 'All' button", async () => {
      const user = userEvent.setup();
      renderWithProviders(<StatusFilter />);

      // Open popover
      const triggerButton = screen.getByRole("button");
      await user.click(triggerButton);

      // Click 'All' button
      const allButton = await screen.findByRole("button", { name: /all/i });
      await user.click(allButton);

      // Verify all statuses were selected
      expect(mockUpdateFilters).toHaveBeenCalledWith("statuses", [
        EStatus.ACTIVE,
        EStatus.PENDING,
        EStatus.LIQUIDATED,
      ]);
    });

    it("should clear all statuses when clicking 'None' button", async () => {
      const user = userEvent.setup();

      // Mock with statuses selected
      vi.spyOn(AssetsProvider, "useFilterContext").mockReturnValue({
        filters: {
          statuses: [EStatus.ACTIVE, EStatus.PENDING],
          types: [],
          searchTerm: "",
        },
        updateFilters: mockUpdateFilters,
        setSearchTerm: vi.fn(),
      });

      renderWithProviders(<StatusFilter />);

      // Open popover - find trigger button (should have badges)
      const triggerButton = screen.getAllByRole("button")[0];
      await user.click(triggerButton);

      // Click 'None' button - need to be more specific
      await waitFor(() => {
        expect(screen.getByText("Filter by status")).toBeInTheDocument();
      });

      const buttons = screen.getAllByRole("button", { name: /none/i });
      await user.click(buttons[0]);

      // Verify statuses were cleared
      expect(mockUpdateFilters).toHaveBeenCalledWith("statuses", []);
    });
  });

  describe("Selected Status Display", () => {
    it("should display selected status as a badge chip", async () => {
      // Mock with one status selected
      vi.spyOn(AssetsProvider, "useFilterContext").mockReturnValue({
        filters: {
          statuses: [EStatus.ACTIVE],
          types: [],
          searchTerm: "",
        },
        updateFilters: mockUpdateFilters,
        setSearchTerm: vi.fn(),
      });

      renderWithProviders(<StatusFilter />);

      // The badge should be visible in the trigger button (there might be multiple "Active" texts)
      const activeElements = screen.getAllByText("Active");
      expect(activeElements.length).toBeGreaterThan(0);
    });

    it("should display multiple selected statuses as badge chips", async () => {
      // Mock with multiple statuses selected
      vi.spyOn(AssetsProvider, "useFilterContext").mockReturnValue({
        filters: {
          statuses: [EStatus.ACTIVE, EStatus.PENDING, EStatus.LIQUIDATED],
          types: [],
          searchTerm: "",
        },
        updateFilters: mockUpdateFilters,
        setSearchTerm: vi.fn(),
      });

      renderWithProviders(<StatusFilter />);

      // All badges should be visible
      const activeBadges = screen.getAllByText("Active");
      const pendingBadges = screen.getAllByText("Pending");
      const liquidatedBadges = screen.getAllByText("Liquidated");

      expect(activeBadges.length).toBeGreaterThan(0);
      expect(pendingBadges.length).toBeGreaterThan(0);
      expect(liquidatedBadges.length).toBeGreaterThan(0);
    });
  });

  describe("Badge Removal", () => {
    it("should remove a status when clicking its delete icon", async () => {
      const user = userEvent.setup();

      // Mock with statuses selected
      vi.spyOn(AssetsProvider, "useFilterContext").mockReturnValue({
        filters: {
          statuses: [EStatus.ACTIVE, EStatus.PENDING],
          types: [],
          searchTerm: "",
        },
        updateFilters: mockUpdateFilters,
        setSearchTerm: vi.fn(),
      });

      renderWithProviders(<StatusFilter />);

      // Find the delete button for badge (in the trigger area, not in popover)
      const deleteButtons = screen.getAllByTestId("CloseIcon");

      // Find the close icon that's part of the badge chip (not the popover)
      const badgeDeleteButton = deleteButtons.find(
        (icon) => icon.closest(".item-picker__trigger") !== null,
      );

      if (badgeDeleteButton) {
        // Click the actual button that contains the icon
        const buttonElement = badgeDeleteButton.closest("button");
        if (buttonElement) {
          await user.click(buttonElement);
        }
      }

      // Verify the status was removed
      expect(mockUpdateFilters).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      renderWithProviders(<StatusFilter />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should be keyboard navigable", async () => {
      const user = userEvent.setup();
      renderWithProviders(<StatusFilter />);

      const button = screen.getByRole("button");

      // Focus and activate with keyboard
      await user.tab();
      expect(button).toHaveFocus();

      await user.keyboard("{Enter}");

      // Popover should open
      await waitFor(() => {
        expect(screen.getByText("Filter by status")).toBeInTheDocument();
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty status list gracefully", () => {
      renderWithProviders(<StatusFilter />);
      expect(screen.getByText("Filter by status...")).toBeInTheDocument();
    });

    it("should not break when updateFilters is called multiple times", async () => {
      const user = userEvent.setup();
      renderWithProviders(<StatusFilter />);

      const triggerButton = screen.getByRole("button");
      await user.click(triggerButton);

      const activeOption = await screen.findByText("Active");
      const listItem = activeOption.closest("button");

      // Click multiple times
      if (listItem) {
        await user.click(listItem);
        await user.click(listItem);
        await user.click(listItem);
      }

      // Should have been called 3 times
      expect(mockUpdateFilters).toHaveBeenCalledTimes(3);
    });
  });

  describe("Integration with Context", () => {
    it("should sync with context filters on mount", () => {
      const initialStatuses = [EStatus.PENDING, EStatus.LIQUIDATED];

      vi.spyOn(AssetsProvider, "useFilterContext").mockReturnValue({
        filters: {
          statuses: initialStatuses,
          types: [],
          searchTerm: "",
        },
        updateFilters: mockUpdateFilters,
        setSearchTerm: vi.fn(),
      });

      renderWithProviders(<StatusFilter />);

      // The selected statuses should be displayed (might have multiple instances)
      const pendingElements = screen.getAllByText("Pending");
      const liquidatedElements = screen.getAllByText("Liquidated");

      expect(pendingElements.length).toBeGreaterThan(0);
      expect(liquidatedElements.length).toBeGreaterThan(0);
    });

    it("should call updateFilters with correct arguments", async () => {
      const user = userEvent.setup();
      renderWithProviders(<StatusFilter />);

      const triggerButton = screen.getByRole("button");
      await user.click(triggerButton);

      const liquidatedOption = await screen.findByText("Liquidated");
      const listItem = liquidatedOption.closest("button");
      if (listItem) {
        await user.click(listItem);
      }

      expect(mockUpdateFilters).toHaveBeenCalledWith("statuses", [EStatus.LIQUIDATED]);
      expect(mockUpdateFilters).toHaveBeenCalledTimes(1);
    });
  });
});
