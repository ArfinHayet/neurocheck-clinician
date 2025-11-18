"use client";
import { getAllappointments } from "@/api/assessment";
import Header from "@/components/ui-reusable/Header";
import { formatDate } from "@/components/utils/formateDate";
import { AuthContext } from "@/Provider/AuthProvider";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import { MdOutlineJoinInner } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";

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

const { userData } = useContext(AuthContext) || {};
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [appointment, setAppointment] = useState([]);

  const fetchAppointments = async () => {
    const res = await getAllappointments();
    const rawData = res?.payload?.filter(
      (i) => i?.clinicianId === Number(userData?.id),
    );
    console.log("appppp",rawData);
    setAppointment(rawData);
  };

  useEffect(() => {
    fetchAppointments();
  }, [userData?.id]);

  return (
    <div className="min-h-screen">
      <Header
        title="Appointment List"
        description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
      />

      <div className="">
        <table className="w-full text-center border-collapse">
          <thead className="text-[#000000]">
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
            {appointment?.map((appt) => (
              <tr
                key={appt.id}
                className="border-b text-center text-xs border-[#DFDFDF] hover:bg-gray-50"
              >
                <td className="p-3">{appt.displayName}</td>
                <td
                  className={`text-center text-xs mt-4 px-2 py-1 inline-block rounded-full ${statusColors[appt.status]}`}
                >
                  {appt.status}
                </td>
                <td className="p-3">{formatDate(appt.time)}</td>
                <td className={`p-3 ${callStatusColors[appt.callStatus]}`}>
                  {appt.metting_status}
                </td>
                <td className="p-3">{appt.tries}</td>
                <td><p className="flex justify-center items-center gap-4">
                  <span><MdOutlineJoinInner size={20}/></span>
                  <span><IoEyeSharp size={20} /></span>
                </p></td>
                {/* <td className="p-3 text-center relative">
                  <PiDotsThreeBold
                    className="cursor-pointer text-xl"
                    onClick={() =>
                      setOpenDropdownId(
                        openDropdownId === appt.id ? null : appt.id,
                      )
                    }
                  />

                  {openDropdownId === appt.id && (
                    <div className="absolute right-0 mt-2 w-30 bg-white shadow-lg rounded-md  z-50 text-left text-sm">
                      <button
                        onClick={() => {
                          setSelectedAppointment(appt);
                          setShowModal(true);
                          setOpenDropdownId(null);
                        }}
                        className="block w-full text-left text-sm px-4 py-2 hover:bg-gray-100"
                      >
                        View Details
                      </button>
                      <Link href={appt.link}>
                        <button
                          onClick={() => alert("Join Meeting Clicked")}
                          className="block text-left text-sm w-full px-4 py-2 hover:bg-gray-100"
                        >
                          join Meeting
                        </button>
                      </Link>
                    </div>
                  )}
                </td> */}

                {/* <td className="p-3 text-center"><PiDotsThreeBold/></td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {/* <BasicTable/> */}
      </div>

      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Patient Name:</strong> {selectedAppointment.displayName}
              </p>
              <p>
                <strong>Status:</strong> {selectedAppointment.status}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(selectedAppointment.time)}
              </p>
              <p>
                <strong>Call Status:</strong>{" "}
                {selectedAppointment.metting_status}
              </p>
              <p>
                <strong>Retries:</strong> {selectedAppointment.tries}
              </p>
              <p>
                <strong>Diagnosis:</strong>{" "}
                {selectedAppointment.diagnosis ?? "N/A"}
              </p>
              <p>
                <strong>Notes:</strong>{" "}
                {selectedAppointment.notes_from_review ?? "N/A"}
              </p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Appointment;
