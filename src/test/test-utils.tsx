import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { vi } from "vitest";
import { AssetsProvider } from "../context/providers/assets-provider";

/**
 * Custom render function that wraps components with necessary providers
 */
export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <AssetsProvider>{children}</AssetsProvider>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

/**
 * Create a mock FilterContext value for testing
 */
export function createMockFilterContext(overrides = {}) {
  return {
    filters: {
      statuses: [],
      types: [],
      searchTerm: "",
    },
    updateFilters: vi.fn(),
    setSearchTerm: vi.fn(),
    ...overrides,
  };
}

// Re-export everything from React Testing Library
export * from "@testing-library/react";
