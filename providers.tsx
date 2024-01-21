'use client'
import {KindeProvider, useKindeAuth} from "@kinde-oss/kinde-auth-nextjs";
import { ConvexProviderWithAuth } from "convex/react";
import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "./hooks/useAuth";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);
export default function AuthProvider ({children}:{children: ReactNode}){
    
    return (
        <KindeProvider>
            <ConvexProviderWithAuth client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithAuth>
        </KindeProvider>
    )
}