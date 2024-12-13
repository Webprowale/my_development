import { BankTransfer } from "../assets/svg/bank-transfer";
import { DebitCard } from "../assets/svg/debit-card";
import { UserIcon } from "../assets/svg/user";
import airtel from "../assets/svg/airtel.svg";
import mtn from "../assets/svg/mtn.svg";
import ninemobile from "../assets/svg/9mobile.svg";
import glo from "../assets/svg/glo.svg";
import showmax from "../assets/svg/showmax.svg";
import dstv from "../assets/svg/dstv.svg";
import startimes from "../assets/svg/star-times.svg";
import gotv from "../assets/svg/gotv.svg";

export const LINK_DATA = [
  { title: "Wallet Home", link: "/gopal/wallet", path: "wallet" },
  { title: "My Cards", link: "/gopal/wallet/my-cards", path: "my-cards" },
  { title: "GoPoints", link: "/gopal/wallet/go-points", path: "go-points" },
  { title: "Pay Bills", link: "/gopal/wallet/pay-bills", path: "pay-bills" },
  // {
  //   title: "Payment Methods",
  //   link: "/gopal/wallet/payment-methods",
  //   path: "payment-methods",
  // },
];

export const TRANSACTION_LINK_DATA = [
  {
    title: "All Transactions",
    link: "/gopal/wallet/transaction-history",
    path: "transaction-history",
  },
  { title: "Payments", link: "#", path: "transaction-history" },
  { title: "Deposits", link: "#", path: "/gopal/wallet/transaction-history" },
  { title: "Transfer", link: "#", path: "/gopal/wallet/transfer-funds" },
  { title: "Conversions", link: "#", path: "/gopal/wallet/go-points" },
];

export const FUND_DATA = [
  // {
  //   icon: <UserIcon />,
  //   title: "Share your @Username",
  //   link: "/gopal/wallet?tab=wallet&wallet=share",
  //   text: "Receive money from other GoPaddi users",
  //   id: "user",
  // },
  {
    icon: <BankTransfer />,
    title: "Bank Transfer",
    link: "/gopal/wallet?tab=wallet&wallet=transfer",
    text: "Receive money through bank transfers or internet banking",
    id: "transfer",
  },
  // {
  //   icon: <DebitCard />,
  //   title: "Debit Card",
  //   link: "/gopal/wallet?tab=wallet&wallet=debit",
  //   text: "Add money with a debit card",
  //   id: "debitcard",
  // },
];

export const AIRTIME_DATA = [
  {
    icon: airtel,
    title: "Airtel",
  },
  {
    icon: mtn,
    title: "MTN",
  },
  {
    icon: glo,
    title: "Glo",
  },
  {
    icon: ninemobile,
    title: "9Mobile",
  },
];

export const CABLE_DATA = [
  {
    icon: showmax,
    title: "Show Max",
  },
  {
    icon: gotv,
    title: "GoTv NG",
  },
  {
    icon: dstv,
    title: "DSTV",
  },
  {
    icon: startimes,
    title: "Startimes NG",
  },
];

export const AIRTIME_BUNDLE_DATA = [
  "120GB for N20,000 valid for 30 days. (NGN 19,999.00)",
  "75GB for N15,000 valid for 30 days. (NGN 14,999.00)",
  "40GB for N10,000 valid for 30 days. (NGN 9,999.00)",
  "40GB for N10,000 valid for 30 days. (NGN 9,999.00)",
  "Data plan gives 1.5GB for N1,200 valid for 30 days. (NGN 1,199.00)",
];

export const CABLE_TV_OPTION = [
  "Ent Mobile - 1 Month (1,200)",
  "Ent Mobile - 3 Months (2,800)",
  "Ent - 1 Month (2,500)",
  "PL Mobile - 1 Month (2,900)",
  "PL Mobile 3 Months (8,700)",
];
