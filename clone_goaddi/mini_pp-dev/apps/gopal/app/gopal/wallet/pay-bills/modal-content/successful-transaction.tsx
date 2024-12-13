"use client";

import { useState } from "react";
import TransactionSuccessful from "../../transfer-funds/modal-content/transaction-successful";

const SuccessfulTransfer = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <TransactionSuccessful
      title="Transaction Successful"
      text="Your transfer has been completed successfully"
      closeModal={() => setIsOpen(false)}
    />
  );
};

export default SuccessfulTransfer;
