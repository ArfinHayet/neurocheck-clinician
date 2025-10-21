import Image from "next/image";
import React from "react";
import p1 from "../../../public/svg/mobile_logo.svg";
import { LuMessageSquareMore} from "react-icons/lu";
import { BiMessageDetail } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiShutDownLine } from "react-icons/ri";

const Topbar = (
  {
    // title = "N",
    // onNotificationClick,
    // onMessageClick 
  },
) => {
  return (
    <div className="md:hidden bg-[#114654] text-white px-4 py-3 flex items-center justify-between">
      <div className="text-2xl font-bold text-black">
        <Image
          alt="logo"
          src={p1} height={61} width={61} className="w-10 h-10" />
      </div>

      <div className="flex gap-2">
        <button>
       <LuMessageSquareMore className="text-xl text-white " />
        </button>
        
        <button>
          <IoNotificationsOutline className="text-xl text-white" />
        </button>
        <button>
          <RiShutDownLine className="text-xl text-white" />
        </button>
        {/* <span 
          className="cursor-pointer" 
        //   onClick={onNotificationClick}
        >
            <RiShutDownLine className="text-xl text-[#114654]" />
        </span> */}
        {/* <span 
          className="cursor-pointer" 
        //   onClick={onMessageClick}
        >
          💬
        </span> */}
      </div>
    </div>
  );
};

export default Topbar;
