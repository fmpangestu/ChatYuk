"use client";
import LoadingLogo from "@/components/shared/LoadingLogo";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { Authenticated, AuthLoading, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const convex = new ConvexReactClient(CONVEX_URL);
const ConvexClientProvider = ({ children }: Props) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ClerkProvider>
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
          <Authenticated>{children}</Authenticated>
          <AuthLoading>
            <LoadingLogo />
          </AuthLoading>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </React.Suspense>
  );
};

export default ConvexClientProvider;
