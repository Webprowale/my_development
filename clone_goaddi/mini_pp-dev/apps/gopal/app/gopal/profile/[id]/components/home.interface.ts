interface InfoCardTheme {
  bg: string;
  text: string;
  buttonBg: string;
  buttonTextColor: string;
}

interface InfoCardProps {
  title: string;
  description: string;
  theme: InfoCardTheme;
}

interface ListLayoutProps {
  title: string;
  icon: string;
  bgColor: string;
  btnTextColor?: string;
  data: any[];
  listItem: JSX.Element;
}
