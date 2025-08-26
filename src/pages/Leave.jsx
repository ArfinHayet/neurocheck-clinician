"use client";

// import { useMemo, useState } from "react";
// import Table from "@/components/ui-reusable/Table";
// import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Modal from "@/components/ui-reusable/Modal";
import { useState } from "react";

const Leave = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const availabilityTypes = ["Select your leave type", "Personal", "Work"];
  const [timeSlots, setTimeSlots] = useState([{ start: "", end: "" }]);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddSlot = () => {
    setTimeSlots([...timeSlots, { start: "", end: "" }]);
  };

  //   const data = [
  //     {
  //       transaction_date: "2025-08-01",
  //       mode: "Cash",
  //       transaction_amount: 1200,
  //     },
  //     {
  //       transaction_date: "2025-08-05",
  //       mode: "Bank Transfer",
  //       transaction_amount: 2500,
  //     },
  //     {
  //       transaction_date: "2025-08-10",
  //       mode: "Card",
  //       transaction_amount: 900,
  //     },
  //   ];

  //   const columns = useMemo(
  //     () => [
  //       {
  //         accessorKey: "transaction_date",
  //         header: "Leave type"
  //       },
  //       {
  //         accessorKey: "mode",
  //         header: "Start date",
  //       },
  //       {
  //         accessorKey: "transaction_amount",
  //         header: "End date"
  //       },
  //     //   {
  //     //     accessorKey: "transaction",
  //     //     header: "Status"
  //     //   },
  //     ],
  //     []
  //   );

  //   const table = useReactTable({
  //     data,
  //     columns,
  //     getCoreRowModel: getCoreRowModel(),
  //   });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0A4863] text-sm cursor-pointer text-white rounded-2xl px-2 py-1"
        >
          Add leave
        </button>
      </div>
      <div>{/* <Table table={table} /> */}</div>
      <Modal
        classname="w-[30vw] h-auto"
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Add leave"
      >
        <p className="-mt-7 text-xs text-[#3C3C4399]">
          Schedule your time off. Let us know when you’ll be unavailable so we
          can keep things running smoothly.
        </p>
        <div className="flex flex-col gap-3">
          <div>
            <label className="block mb-4 text-[#5A5A5A] font-semibold text-sm ">
              Leave type
            </label>
            <select
              className="w-full border outline-none text-sm text-[#5A5A5A] border-[#E1E1E1] p-3 rounded-xl"
              placeholder="Account information"
            >
              {availabilityTypes.map((type) => (
                <option className="text-xs" key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="w-full border outline-none text-sm text-[#5A5A5A] border-[#E1E1E1] p-3 rounded-xl"
              placeholder="Account information"
            >
              {availabilityTypes.map((type) => (
                <option className="text-xs" key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {timeSlots.map((slot, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="time"
              className="flex-1 border text-sm text-[#5A5A5A] outline-none border-[#E1E1E1]  rounded-xl p-2"
              value={slot.start}
              onChange={(e) => handleSlotChange(index, "start", e.target.value)}
            />
            <input
              type="time"
              className="flex-1 border text-sm text-[#5A5A5A] outline-none border-[#E1E1E1]   rounded-xl p-2"
              value={slot.end}
              onChange={(e) => handleSlotChange(index, "end", e.target.value)}
            />
            {index === timeSlots.length - 1 && (
              <button
                type="button"
                className="px-4 py-2 border border-[#E1E1E1]  rounded bg-gray-100 hover:bg-gray-200"
                onClick={handleAddSlot}
              >
                +
              </button>
            )}
          </div>
        ))}

        <button className="bg-[#0A4863] w-full rounded-2xl text-sm p-1 text-white">
          Submit
        </button>
      </Modal>
    </div>
  );
};

export default Leave;
