import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { TableErrorFallback } from "./components/error-boundary/table-error-fallback";
import { StatusFilter } from "./components/filters/status-filter/status-filter";
import { TypeFilter } from "./components/filters/type-filter/type-filter";
import { Header } from "./components/header/header";
import { SearchInput } from "./components/input/search-input";
import { TableSkeleton } from "./components/skeletons/table-skeleton";
import { Surface } from "./components/surface/surface";
import { TableDisplay } from "./components/table-display/table-display";
import {
  AssetsDataProvider,
  AssetsProvider,
  useFilterContext,
} from "./context/providers/assets-provider";
import "./index.scss";

function LayoutContent() {
  const { reset } = useQueryErrorResetBoundary();
  const { setSearchTerm } = useFilterContext();

  return (
    <Surface className="surface--full-width">
      <div className="surface-content">
        <div className="search-wrapper" style={{ marginBottom: "1rem" }}>
          <SearchInput
            onSearch={setSearchTerm}
            placeholder="Search assets by name..."
            debounceMs={500}
          />
        </div>
        <div className="multiselect-filters__wrapper">
          <div className="multiselect-filters__item">
            <StatusFilter placeholder="Filter by status..." />
          </div>
          <div className="multiselect-filters__item">
            <TypeFilter placeholder="Filter by type..." />
          </div>
        </div>
        <div className="table-container">
          <ErrorBoundary onReset={reset} fallbackRender={TableErrorFallback}>
            <Suspense fallback={<TableSkeleton rows={5} />}>
              <AssetsDataProvider>
                <TableDisplay />
              </AssetsDataProvider>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </Surface>
  );
}

function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="main-content__wrapper">
        <div className="main-content__container">
          <AssetsProvider>
            <LayoutContent />
          </AssetsProvider>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default Layout;
