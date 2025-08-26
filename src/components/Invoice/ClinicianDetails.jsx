import { FaCalendarAlt, FaFileInvoice } from "react-icons/fa";

const ClinicianDetails = () => (
  <div className=" p-4 rounded-lg  flex justify-between items-start border border-[#DFDFDF] mb-8">
    <div className="">
      <h2 className="text-lg font-semibold text-black">Dr Alison Lennox</h2>
      <p className="text-sm text-gray-600">Consultant psychiatrist, Adult Autism</p>
      <p className="text-sm text-gray-600">clinicianemail2gmail.com</p>
      <p className="text-sm text-gray-600">07654 327 89</p>
    </div>

    <div className="text-sm text-gray-700 space-y-3">
      <div className="flex items-center gap-2">
        <FaFileInvoice />
        <span>INV-JUL-2025-039</span>
        <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 text-xs rounded-full ml-2">unpaid</span>
      </div>
      <div className="flex items-center gap-2">
        <FaCalendarAlt />
        <span>31 July 2025</span>
      </div>
    </div>
  </div>
);

export default ClinicianDetails;
