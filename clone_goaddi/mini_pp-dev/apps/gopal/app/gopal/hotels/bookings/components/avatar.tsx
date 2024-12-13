import React from "react";

type Props = {
  image: string;
  firstName: string;
  lastName: string;
  username: string;
  you?: boolean;
};

function Avatar({ image, firstName, lastName, username, you }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="">
        <img src={image} alt="" className="w-12 h-12 rounded-full" />
      </div>
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-1">
          <h4 className="text-base font-medium">
            {firstName} {lastName}
          </h4>
          {you ? (
            <div className="text-sm px-2 h-6 text-primary600 bg-primary100">
              you
            </div>
          ) : null}
        </div>
        <p className="text-xs text-slate-500 font-medium">{username}</p>
      </div>
    </div>
  );
}

export default Avatar;
