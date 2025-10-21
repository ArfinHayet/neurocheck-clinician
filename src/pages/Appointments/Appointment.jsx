"use client";
import Header from "@/components/ui-reusable/Header";
import { useState } from "react";

const mockAppointments = [
  {
    id: 1,
    patient: "Taimoor Nasir",
    doctor: "Dr. Abdulmawla Alhasan",
    specialization: "Specialist Vascular Surgery",
    status: "Confirmed",
    date: "Wed 1:00pm",
    callStatus: "Active",
    retries: 3,
  },
  {
    id: 2,
    patient: "Mohsin Ijaz",
    doctor: "Dr. Israa Mustafa",
    specialization: "General Practitioner",
    status: "Rescheduled",
    date: "Wed 7:20am",
    callStatus: "Escalated",
    retries: 2,
  },
  {
    id: 3,
    patient: "Aya Khamsi",
    doctor: "Dr. Khairat Al Habbal",
    specialization: "Specialist Family Medicine",
    status: "Cancelled",
    date: "Wed 2:45am",
    callStatus: "Resolved",
    retries: 2,
  },
];

const statusColors = {
  Confirmed: "bg-green-100 text-green-600",
  Rescheduled: "bg-orange-100 text-orange-600",
  Cancelled: "bg-red-100 text-red-600",
  Unknown: "bg-gray-100 text-gray-600",
};

const callStatusColors = {
  Active: "text-green-600",
  Escalated: "text-blue-600",
  Resolved: "text-purple-600",
  Dropped: "text-orange-600",
  Scheduled: "text-purple-600",
  Missed: "text-red-600",
};

const Appointment = () => {
  const [selected, setSelected] = useState([]);

  return (
    <div className=" min-h-screen">
      <Header
        title="Appointment List"
        description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead className="text-[#000000] ">
            <tr>
              <th className="p-3">Patient Name</th>
              <th className="p-3">Appointment Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Call Status</th>
              <th className="p-3">No of Retries</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockAppointments.map((appt) => (
              <tr
                key={appt.id}
                className="border-b text-xs border-[#DFDFDF] hover:bg-gray-50"
              >
                <td className="p-3">
                  {appt.patient} <br /> 
                  <span className="text-xs text-gray-500">
                    {"+971563463741"}
                  </span>
                </td>
                <td
                  className={`text-center text-xs mt-4 px-2 py-1 inline-block rounded-full ${statusColors[appt.status]}`}
                >
                  {appt.status}
                </td>
                <td className="p-3">{appt.date}</td>
                <td
                  className={`p-3 ${callStatusColors[appt.callStatus]}`}
                >
                  {appt.callStatus}
                </td>
                <td className="p-3">{appt.retries}</td>
                <td className="p-3">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Appointment;
