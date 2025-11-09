import { useSuspenseQuery } from "@tanstack/react-query";
import { mockAssets } from "../const";
import type { IAsset } from "../index"; // Assuming types are exported

/**
 * Simulates an API call with a random chance of failure and a delay.
 * @returns A Promise resolving to an array of Assets.
 */
export async function mockFetchAssets(): Promise<IAsset[]> {
  const isError = Math.random() < 0.5; // 50% chance of failure (for testing)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isError) {
        reject(new Error("Please try reloading. If the problem persists, contact support."));
      } else {
        resolve(mockAssets);
      }
    }, 1000); // 1 second delay
  });
}

export const useMockFetchAssetsQueryKey = () => ["get-all-assets"];

export const useMockFetchAssets = () => {
  return useSuspenseQuery({
    queryKey: useMockFetchAssetsQueryKey(),
    queryFn: mockFetchAssets,
  });
};
