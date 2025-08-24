"use client";
import { LuMessageSquareText } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import Header from "@/components/ui-reusable/Header";
const Appointment = () => {
  return (
    <div>
        <Header
        title="Appointments"
        description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
        // onMessageClick={handleMessageClick}
        // onNotificationClick={handleNotificationClick}
      />
       
    </div>
  );
};

export default Appointment;
