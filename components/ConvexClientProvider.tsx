"use client";
import { ReactNode } from "react";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import { ConvexProviderWithKinde } from "@/lib/ConvexClientProvider";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <KindeProvider>
      <ConvexProviderWithKinde client={convex}>
        {children}
      </ConvexProviderWithKinde>
    </KindeProvider>
  );
}
