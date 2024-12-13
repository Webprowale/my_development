import { number, string } from "zod";

export type SearchParams = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export interface IDashOverview {
  title: string;
  value: any;
  mark: string;
  percent: string | number;
}

export interface ITripItemType {
  image?: any;
  tripTitle: string;
  location: string;
  date: string;
}

export interface IQuotationType {
  title: string;
}

export interface travelHistoryType {
  headerTitle: string;
}

export interface IActivityItem {
  status: "paid" | "pending" | "declined";
  name: string;
  date: string;
}

export type BrandModalType = {
  title: string;
  paragraph: string;
};

export type IPricing = {
  id: string | number;
  planName: string;
  planSubtitle?: string;
  planPrice: any;
  planDuration: string;
  benefits: string[];
  variant?: "light" | "dark";
  ctaText?: string;
  recommended?: boolean;
  makePayment?: (data: any) => void;
  membership?: string;
  isCurrentPlan?: boolean;
};

export type OnboardProfilePicture = {
  name: string;
  label: string;
  errors?: any;
  classes?: string;
  setMediaFiles?: any;
};

export type IInterests = {
  label: string;
  id: string;
  icon?: any;
  name: string;
};

export type IFollow = {
  isVerified: boolean;
  name: string;
  img: string;
  id: string;
  followersCount: number;
  content: string;
};

export type OnboardingNavType = {
  id: string | number;
  name: string;
  link: string;
  step: string;
};

export type ApiResponseType = Promise<{
  data: any;
  error: boolean;
  serverResponse: {
    [key: string]: any;
  };
}>;

export type OnboardSidebar = {
  heading: string;
  subtitle: string;
};

export type devicesType = {
  deviceName: string;
  isActive: boolean;
  deviceOs: string;
  isTrusted: boolean;
  openDeviceModal: () => void;
};

export type SettingTabType = {
  tabName: string;
  tabLink: string;
};

export type SettingTabList = {
  tabList: any;
};

export type DeviceDetailType = {
  closeDeviceModal: () => void;
  isMobile: boolean;
  deviceName: string;
  devicePlatform?: string;
};

export type TripCardType = {
  image?: any;
  name: string;
  date: string;
  duration: string;
  isDraft: boolean;
  location: string;
};

export type MyTripType = {
  id: string;
  name: string;
  description: string;
  tag: string;
  isAccepted: boolean;
  peopleCount?: number;
  peopleData?: any;
  tripType?: string;
};

export type TripActionsType = {
  title: string;
  subtitle: string;
  ctaText: string;
  url: string;
  btnClass?: string;
  titleClass?: string;
  subtitleClass?: string;
  className: string;
};

export type SelectedFlightType = {
  index: number;
  removeFlight: () => void;
};

export type UserPayType = {
  name: string;
  username: string;
  image: string;
  amount: number;
  status: "paid" | "pending";
  isYou: boolean;
};

export type MedicalCardType = {
  id: number;
  name: string;
  subtitle: string;
  image: string;
};
export type KanbanCardType = {
  color: string;
};

export type ReportItemTypes = {
  id: Number;
  title: string;
  subtitle: string;
  setValue?: any;
  report?: boolean;
  list?: any;
};

export type ReportType = {
  id: number;
  title: string;
  subtitle: string;
  groups: any;
};
export default {};
