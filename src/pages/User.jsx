"use client";
import UserTab from "@/components/ui-reusable/UserTab";
import { useState, useMemo } from "react";
import Availability from "./Availability";
import Leave from "./Leave";
import Invoice from "./Invoice";

const User = () => {
  const tabs = ["Personal Info", "Availability", "Leave", "Invoices"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const tabMeta = {
    "Personal Info": {
      title: "Personal Information",
      description: "Manage basic details and contact information.",
    },
    Availability: {
      title: "Availability",
      description: "Set working hours and appointment slots.",
    },
    Leave: {
      title: "Leave",
      description: "Apply for leave and view history.",
    },
    Invoices: {
      title: "Invoices",
      description: "Review and manage billing records.",
    },
  };

  const { title, description } = useMemo(
    () => tabMeta[selectedTab] ?? { title: selectedTab, description: "" },
    [selectedTab]
  );

  return (
    <div className="p-6 lg:p-0">
      <UserTab
        tabs={tabs}
        selected={selectedTab}
        setSelected={setSelectedTab}
        title={title}
        description={description}
      />

      <div className="mt-4 h-[50vh]">
        {selectedTab === "Personal Info" && (
          <div className="grid grid-cols-3 gap-10">
            <p>…content…</p>
          </div>
        )}
        {selectedTab === "Availability" && <Availability/>}
        {selectedTab === "Leave" && <Leave/>}
        {selectedTab === "Invoices" && <Invoice/>}
      </div>
    </div>
  );
};

export default User;
