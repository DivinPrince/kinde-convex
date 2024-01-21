"use client"
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useCallback,useMemo } from "react";

export function useAuth() {
    const { isLoading, isAuthenticated, getAccessToken } = useKindeAuth();
    const fetchAccessToken = useCallback(
      async ({ forceRefreshToken}:{ forceRefreshToken: any}) => {
        // Here you can do whatever transformation to get the ID Token
        // or null
        const freePromise: Promise<any> = new Promise((resolve, reject) => {
            // Simulating an asynchronous operation
                resolve("Operation successful!")
          });
        // Make sure to fetch a new token when `forceRefreshToken` is true
        return await getAccessToken() ?? freePromise
      },
      // If `getToken` isn't correctly memoized
      // remove it from this dependency array
      [getAccessToken]
    );
    return useMemo(
      () => ({
        // Whether the auth provider is in a loading state
        isLoading: isLoading ?? false,
        // Whether the auth provider has the user signed in
        isAuthenticated: isAuthenticated ?? false,
        // The async function to fetch the ID token
        fetchAccessToken,
      }),
      [isLoading, isAuthenticated, fetchAccessToken]
    );
  }