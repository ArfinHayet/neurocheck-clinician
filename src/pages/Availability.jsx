import { useState } from "react";

const Availability = () => {
    
  const [timeSlots, setTimeSlots] = useState([{ start: "", end: "" }]);
  const availabilityTypes = ["Account information", "Personal", "Work"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const handleAddSlot = () => {
    setTimeSlots([...timeSlots, { start: "", end: "" }]);
  };

  const handleSlotChange = (index, field, value) => {
    const newSlots = [...timeSlots];
    newSlots[index][field] = value;
    setTimeSlots(newSlots);
  };

    return (

    <div className="w-4/6 flex flex-col gap-4 mt-10 space-y-4">      
      <div>
        <label className="block mb-4 text-[#5A5A5A] font-semibold text-sm ">Availability type</label>
        <select className="w-full border outline-none text-sm text-[#5A5A5A] border-[#E1E1E1]  rounded p-2"
        placeholder = "Account information"        >
          {availabilityTypes.map((type) => (
            <option className="text-xs" key={type}>{type}</option>
          ))}
        </select>
      </div>

   
      <div className="flex gap-2">
        <input
          type="time"
          className="flex-1 border text-sm text-[#5A5A5A] outline-none border-[#E1E1E1]  rounded p-2"
          placeholder="Start time"
        />
        <input
          type="time"
          className="flex-1 border text-sm text-[#5A5A5A] outline-none border-[#E1E1E1]  rounded p-2"
          placeholder="End time"
        />
      </div>

      
      <div>
      
        <select className="w-full outline-none border text-sm text-[#5A5A5A] border-[#E1E1E1]  rounded p-2">
          {days.map((day) => (
            <option key={day}>{day}</option>
          ))}
        </select>
      </div>

      {timeSlots.map((slot, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="time"
            className="flex-1 border text-sm text-[#5A5A5A] outline-none border-[#E1E1E1]  rounded p-2"
            value={slot.start}
            onChange={(e) => handleSlotChange(index, "start", e.target.value)}
          />
          <input
            type="time"
            className="flex-1 border text-sm text-[#5A5A5A] outline-none border-[#E1E1E1]  rounded p-2"
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
    </div>
    );
};

export default Availability;