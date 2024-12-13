"use client";

import React from "react";
import Subscription from "./subscribe";
import SubscribedMessage from "./SubscribedMessage";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";

const PageContainer = () => {
  const { isUserSubscribed } = useSubscriptionStore();
  return (
    <>
      {isUserSubscribed?.subscribed === false && <Subscription />}
      {isUserSubscribed?.subscribed && <SubscribedMessage />}
    </>
  );
};

export default PageContainer;
