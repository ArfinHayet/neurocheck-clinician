// import React from 'react';

// const Header = ({
//   title = "Page Title",
//   description = "Your central hub for page actions",
//   time,
//   onMessageClick,
//   onNotificationClick,
// }) => {
//     return (
//         <div className="flex-1 p-4 md:p-8">
//       {/* Top row */}
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center">
//         <h1 className="text-2xl font-bold">{title}</h1>
//         <div className="flex gap-2">
//           <button onClick={onMessageClick}>
//             <LuMessageSquareText className="text-xl text-[#114654]" />
//           </button>
//           <button onClick={onNotificationClick}>
//             <IoNotificationsOutline className="text-xl text-[#114654]" />
//           </button>
//         </div>
//       </div>

//       {/* Bottom row */}
//       <div className="flex flex-col md:flex-row md:justify-between">
//         <p className="mt-2 text-sm text-[#6C6C6C]">{description}</p>
//         {time && (
//           <p className="text-2xl font-medium text-[#3B3B3B] mt-2 md:mt-0">
//             {time}
//           </p>
//         )}
//       </div>
//     </div>
//     );
// };

// export default Header;


import React, { useEffect, useState } from "react";
import { LuMessageSquareText } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";

const Header = ({
  title,
  description,
  // onMessageClick,
  // onNotificationClick,
}) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    };

    updateTime(); // set once on load
    const interval = setInterval(updateTime, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 p-4 md:p-8">
      {/* Top row */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex gap-2">
          <button
            // onClick={onMessageClick}
          >
            <LuMessageSquareText className="text-xl text-[#114654]" />
          </button>
          <button
            // onClick={onNotificationClick}
          >
            <IoNotificationsOutline className="text-xl text-[#114654]" />
          </button>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row md:justify-between">
        <p className="mt-2 text-xs text-[#6C6C6C]">{description}</p>
        {time && (
          <p className="text-2xl font-medium text-[#3B3B3B] mt-2 md:mt-0">
            {time}
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
