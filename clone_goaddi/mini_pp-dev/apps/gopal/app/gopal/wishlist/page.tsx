"use client";
import SettingsTab from "@/components/settings/SettingsTab";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Wallet } from "@phosphor-icons/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import WishlistCard from "./wishlist-card";

const WishlistPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const tab = useSearchParams().get("tab");

  console.log("the present tab is");
  console.log(tab);

  return (
    <div className="space-6 bg-white rounded-sm p-5">
      <div className="flex flex-col text-3xl font-bold mb-4">
        <h3>Wishlist (5)</h3>
      </div>

      <div className="grid gap-2 ">
        {Array.from({ length: 5 }).map((_, index) => (
          <WishlistCard />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
