import Image from "next/image";
import Link from "next/link";

import { C_Button } from "./button";
import { headerItems } from "./constants";
import HeaderItem from "./header-item";
import Search from "./components/search";

function Header() {
  return (
    <header className="sticky top-0 z-30 w-full bg-white py-4 md:px-10 px-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link href="/" className="cursor-pointer">
          <img src="/assets/logo.png" alt="logo" />
        </Link>
        <Search />
      </div>

      <div className="flex gap-4 xl:divide-x-2 divide-text-black-secondary/35">
        <div className="hidden xl:flex justify-end items-center gap-3">
          {headerItems.slice(0, 5).map((item, i) => (
            <HeaderItem
              key={i}
              icon={
                <img
                  src={item.icon}
                  alt={item.name}
                  className="h-6 w-6 2xl:h-8 2xl:w-8"
                />
              }
              label={item.name}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 pl-4">
          <div className="hidden md:flex items-center gap-3">
            <C_Button>Subscribe</C_Button>

            {headerItems.slice(5, headerItems.length).map((item, i) => (
              <HeaderItem
                key={i}
                icon={
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="h-6 w-6 2xl:h-8 2xl:w-8"
                  />
                }
                label={item.name}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <Image
              src="/assets/ellipse-775@2x.png"
              alt="profile"
              width={52}
              height={52}
            />
            <img src="/assets/caretdown.svg" alt="icon" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
