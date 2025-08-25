"use client";
import UserTab from "@/components/ui-reusable/UserTab";
import { useState, useMemo } from "react";

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
    <div>
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
        {selectedTab === "Availability" && <div>…content…</div>}
        {selectedTab === "Leave" && <div>…content…</div>}
        {selectedTab === "Invoices" && <div>…content…</div>}
      </div>
    </div>
  );
};

export default User;
