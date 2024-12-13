function CardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white w-full flex md:flex-row flex-col text-sm">
      {children}
      <div className="md:w-10 w-full bg-[#FBEAE9] flex-center">
        <button>&times;</button>
      </div>
    </div>
  );
}

export default CardLayout;
