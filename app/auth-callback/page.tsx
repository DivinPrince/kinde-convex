"use client"
import { TasksUi } from "@/components/tasks-ui";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Auth() {
    const router = useRouter()
    const { isAuthenticated,isLoading } = useConvexAuth();
    console.log(isAuthenticated);
    
    const searchParams = useSearchParams()
    const storeUser = useMutation(api.users.store);
    const [userId, setUserId] = useState<Id<"users"> | null>(null);
    const origin = searchParams.get('origin')
    if (!isAuthenticated && !isLoading) {
        return <div>hello</div>;
    }
    async function createUser() {
        const id = await storeUser();
        setUserId(id)
    }
    if (isAuthenticated) {
        createUser()
    }
    if (userId) {
        router.push(`/${origin}`)
    }

    return (<div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
            <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
            <h3 className='font-semibold text-xl'>
                Setting up your account...
            </h3>
            <p>You will be redirected automatically.</p>
        </div>
    </div>)
}