import { menuList } from "@/components/posts/post-menu/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils";
import {
  CaretDown,
  Gear,
  Notebook,
  SignOut,
  User,
} from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { logout } from "@/services/auth";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getUserId } from "@/lib/get-userId";


type Props = {};

const AvatarDropdown = ({ avatar, firstName, lastName,userId,}: any) => {
  const router = useRouter();
  // const user_id = userId;
  const userID = getUserId()
  const {id:user_id} = useParams()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <li className="flex gap-1 items-center cursor-pointer"
          onClick={()=>{
          }}
        >
          {
            avatar?.length!==0?
            <img src={avatar} className="md:w-9 md:h-9 w-8 h-8 rounded-[50%]" alt="" />
            :
            <Avatar className="md:w-9 md:h-9 w-8 h-8">
            <AvatarImage src={avatar} />
            <AvatarFallback>
              {getInitials(firstName + " " + lastName)}
            </AvatarFallback>
          </Avatar>
          }


          <CaretDown />
        </li>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-[270px] md:p-4 items-start"
      >
        <DropdownMenuGroup>
          {dropItems.map((drop) => {
            const { icon, name, href } = drop;
            return (
              <React.Fragment key={name}>
                <DropdownMenuItem
                  onClick={name === "Logout" ? () => logout(router) : () => {}}
                  className={` ${
                    name === "Logout" ? "bg-red-50 hover:bg-red-100" : null
                  } cursor-pointer md:px-2 md:py-3`}
                >
                  <Link
                    className="w-full inline-flex items-center gap-2"
                    href={ `${ href !== ''? name==="Profile"?`/gopal/profile/${user_id?user_id:userID}`: name==="Diary"? `/gopal/profile/${user_id?user_id:userID}?tab=diary` : href : '/' }`}
                  >
                    {icon}
                    <span
                      className={`  ${
                        name === "Logout" ? "text-[#9E0A05]" : null
                      } font-medium text-xs text-slate-700`}
                    >
                      {name}
                    </span>
                  </Link>
                </DropdownMenuItem>
              </React.Fragment>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AvatarDropdown;

const IconColor = "#344054";
const IconSize = 22;

const dropItems = [
  {
    name: "Profile",
    icon: <User color={IconColor} size={IconSize} />,
  },
  {
    name: "Settings",
    icon: <Gear color={IconColor} size={IconSize} />,
    href: "/gopal/settings",
  },
  {
    name: "Diary",
    icon: <Notebook color={IconColor} size={IconSize} />,
  },
  {
    name: "Logout",
    icon: <SignOut color="#9E0A05" size={IconSize} />,
  },
];
