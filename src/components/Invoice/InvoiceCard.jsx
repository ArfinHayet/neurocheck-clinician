import { FaCalendarAlt } from "react-icons/fa";


const InvoiceCard = ({ month, year, assessmentCount, earnings, status, invoiceLink }) => {
    return (
         <div className="bg-[#0A48630D] p-5 rounded-xl flex justify-between items-center w-full">
      {/* Left Side */}
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <FaCalendarAlt className="text-lg text-gray-500" />
          <p className="text-sm font-semibold text-[#000000]">
            {month} {year}
          </p>
        </div>

        <div className="text-sm text-[#000000] flex gap-5 mt-3">
          <div>
            <span className="font-normal text-sm">Assessment</span> {assessmentCount}
          </div>
          <div>
            <span className="font-normal text-sm">Total Earnings</span> £{earnings}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center gap-4">
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
          {status}
        </span>
        <a href={invoiceLink} className="text-[#114654] text-sm font-medium hover:underline">
          View Invoice
        </a>
      </div>
    </div>
    );
};

export default InvoiceCard;