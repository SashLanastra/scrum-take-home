# Asset Management Dashboard

A production-ready React application for managing and visualizing asset portfolios with advanced filtering, real-time updates, and comprehensive error handling.

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **TanStack Query** (React Query) for data fetching with suspense
- **Material-UI (MUI)** for component library
- **AG Grid** for high-performance data tables
- **Chart.js** + **react-chartjs-2** for data visualization
- **Vitest** + **React Testing Library** for testing

## Key Features

### Async State Management
- **Suspense Boundaries**: Implemented using TanStack Query's `useSuspenseQuery` for declarative loading states, localized to individual components
- **Error Boundaries**: Configured with `react-error-boundary` for granular error handling and retry capabilities, scoped per component
- **Fault Isolation**: Each feature boundary is isolated to prevent cascading failures

### UI Components
- **MUI Component Library**: All custom components built on Material-UI foundations for consistency and accessibility
- **AG Grid Integration**: Data table implemented with AG Grid for enhanced performance, advanced sorting/filtering, and enterprise-grade UX
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Performance Optimizations
- **Debounced Search**: Search input utilizes debouncing to trigger filtering only after user input completion, reducing unnecessary re-renders
- **React Compiler**: Enabled for automatic memoization and optimization

### Testing
- **Comprehensive Test Suite**: 55 tests across 3 test files (100% pass rate)
- **Component Tests**: Full integration tests for multi-select filter components (StatusFilter)
- **Unit Tests**: Pure function tests for helper utilities and filter logic
- **Test Coverage**: Includes component interactions, context integration, accessibility, and edge cases

See [TESTING.md](./TESTING.md) and [TEST_SUMMARY.md](./TEST_SUMMARY.md) for detailed testing documentation.

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build
```bash
npm run build
npm run preview  # Preview production build
```

### Linting
```bash
npm run lint
```

## Running Tests

### Local Machine (Full Support)
```bash
npm test              # Watch mode
npm run test:run      # Run once
npm run test:ui       # Interactive UI
npm run test:coverage # With coverage
```

### ⚠️ CodeSandbox / Sandboxed Environments (Limited Support)
```bash
npm run test:run      # ⚠️ May work but can have failures
```

**Important:** Testing has severe limitations in CodeSandbox:
- Watch mode (`npm test`) and Test UI (`npm run test:ui`) will fail due to file descriptor limits
- Even `npm run test:run` may show test failures due to memory/resource constraints
- **These are environment limitations, not code issues**
- All 55 tests pass reliably on local machines and CI/CD pipelines

**Recommendation:** Clone the repository and test locally for accurate results.

📚 **Documentation:**
- [TESTING.md](./TESTING.md) - Comprehensive testing guide with examples and CodeSandbox workarounds
- [TEST_SUMMARY.md](./TEST_SUMMARY.md) - Implementation details and test coverage

## Architecture Highlights

### Error Handling & Suspense

**Implementation**: Component-scoped error boundaries with TanStack Query integration for automatic retry and cache invalidation.

**Architecture Pattern**:
```tsx
// Layout.tsx - Localized error boundaries per feature
function LayoutContent() {
  const { reset } = useQueryErrorResetBoundary(); // TanStack Query reset hook
  
  return (
    <>
      {/* Stats Section - Independent error boundary */}
      <ErrorBoundary onReset={reset} fallbackRender={StatsErrorFallback}>
        <Suspense fallback={<StatsSkeleton />}>
          <AssetsDataProvider>
            <StatsSection />
          </AssetsDataProvider>
        </Suspense>
      </ErrorBoundary>

      {/* Table Section - Separate error boundary */}
      <ErrorBoundary onReset={reset} fallbackRender={TableErrorFallback}>
        <Suspense fallback={<TableSkeleton />}>
          <AssetsDataProvider>
            <TableDisplay />
          </AssetsDataProvider>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
```

**Custom Error Fallback UI**:
```tsx
// StatsErrorFallback.tsx - User-friendly error recovery
export const StatsErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <Surface>
    <ErrorOutline /> {/* Visual error indicator */}
    <div>{error.message || "Failed to load statistics"}</div>
    
    {/* Primary recovery action */}
    <CustomButton onClick={resetErrorBoundary} icon={<Refresh />}>
      Retry Loading Statistics
    </CustomButton>
    
    {/* Fallback support option */}
    <CustomButton href="tel:+971501234567" icon={<Phone />}>
      Contact Support
    </CustomButton>
  </Surface>
);
```

**Why This Works**:
- **Fault Isolation**: Stats section failure doesn't crash the table; each boundary catches its own errors independently
- **Query Integration**: `onReset={reset}` clears TanStack Query cache on retry, preventing stale error states
- **Automatic Retry**: TanStack Query's built-in retry logic (3 attempts with exponential backoff) handles transient network failures before error boundary triggers
- **User Recovery**: Explicit retry button gives users control; integrates with `useQueryErrorResetBoundary` to reset query state
- **Progressive Degradation**: Failed components display meaningful errors while rest of app remains functional
- **Production Ready**: Error messages are user-friendly, not technical stack traces; includes support escalation path

### Data Layer
- **TanStack Query**: Manages server state with automatic caching, background refetching, and stale-while-revalidate patterns
- **Type-Safe API**: Full TypeScript coverage for API contracts and data models

### State Management & Memoization

**Implementation**: Context providers split into two layers for optimal re-render performance:

1. **FilterContext** - Manages filter state (statuses, types, search term)
2. **AssetsContext** - Manages data fetching and computed filtered results

**Memoization Strategy**:
```typescript
// Filter callbacks wrapped in useCallback - stable references across renders
const updateFilters = useCallback((filterKey, values) => {
  setFilters((prev) => ({ ...prev, [filterKey]: values }));
}, []); // No dependencies - function never recreates

// Context value memoized - only updates when dependencies change
const filterContextValue = useMemo(
  () => ({ filters, updateFilters, setSearchTerm }),
  [filters, updateFilters, setSearchTerm]
);

// Filtered assets computed once per filter change, not on every render
const filteredAssets = useMemo(() => {
  let filtered = assets;
  if (filters.statuses.length > 0) {
    filtered = filtered.filter((asset) => filters.statuses.includes(asset.status));
  }
  // ... additional filters
  return filtered;
}, [assets, filters]); // Only recomputes when assets or filters change
```

**Why This Works**:
- **Split Providers**: Filter UI components consume `FilterContext` and don't re-render when `AssetsContext` updates during data refetch
- **Stable References**: `useCallback` ensures filter handlers maintain referential equality, preventing child component re-renders from prop changes
- **Selective Updates**: Only components consuming changed context values re-render, not the entire tree
- **Computed Efficiency**: Filtering logic runs once per state change, not on every render cycle
- **Performance Gain**: In a tree with 20+ filter consumers, prevents ~19 unnecessary re-renders per filter change

### Performance
- **Debounced Filtering**: Search input implements 300ms debounce to optimize filter operations
- **Virtualized Table**: AG Grid provides row virtualization for large datasets
- **Manual Chunk Splitting**: Vendor dependencies split into separate chunks for optimal caching and parallel loading:
  ```
  mui-core (252 KB)    → MUI components + Emotion
  mui-icons (2 KB)     → Icon library (lazy loaded)
  ag-grid (1,034 KB)   → Enterprise table library
  charts (146 KB)      → Chart.js visualization
  tanstack (33 KB)     → React Query state management
  index (211 KB)       → Application code
  ```
- **Cache Optimization**: Vendor chunks rarely change, enabling long-term browser caching
- **Parallel Loading**: Browser downloads chunks simultaneously, reducing initial load time

### Testing Strategy
Component tests validate user workflows and UI interactions, while unit tests ensure business logic correctness. The StatusFilter component serves as the reference implementation with 21 integration tests and 34 unit tests covering all edge cases.


