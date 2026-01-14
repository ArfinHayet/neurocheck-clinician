"use client";
import Input from "../ui-reusable/Input";

const Signup = ({
  identifier,
  formData,
  handleChange,
  handleSubmit,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => {
  const formFields = [
    ["name", "Your Name", "Full Name"],
    ["phone", "Phone", "Phone Number"],
    ["hcpcTitle", "HCPC Title", "HCPC Title"],
    ["regNo", "Reg No.", "Registration Number"],
    ["practiceName", "Practice Name", "Practice Name"],
    ["address", "Address", "Practice Address"],
    ["bankDetails", "Bank details", "Bank Details"],
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formFields.map(([name, placeholder, label]) => (
        <Input
          key={name}
          name={name}
          placeholder={placeholder}
          label={label}
          value={formData[name]}
          onChange={handleChange}
          className="w-full px-4 py-1 placeholder:text-xs border bg-[#FFFFFF] lg:bg-none border-[#E2E2E2] rounded-3xl outline-none"
        />
      ))}

        <div className="flex flex-col gap-3">     
        <label className="text-xs font-normal text-[#868686]">
          Email Address
        </label>
      
      <input
         id="email"
          type="email"
          // placeholder="choose file"
          name="certifications"
          value={identifier}
          // onChange={handleChange}
          className="w-full px-4 py-2  text-xs  border border-[#E2E2E2] rounded-3xl outline-none"
      />
    </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="certifications"
          className="text-xs font-medium text-[#868686]"
        >
          Certifications
        </label>
        <input
          id="certifications"
          type="file"
          placeholder="choose file"
          name="certifications"
          onChange={handleChange}
          className="w-full px-4 py-2  text-xs text-[#868686] border border-[#E2E2E2] rounded-3xl outline-none"
        />
      </div>

      <div className="relative flex flex-col gap-1">
        <Input
          id="password"
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-1 placeholder:text-xs border border-[#E2E2E2] rounded-3xl outline-none pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-11 cursor-pointer transform -translate-y-1/2 text-gray-600"
        >
          👁
        </button>
      </div>
      <div className="relative flex flex-col gap-1">
        <Input
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full placeholder:text-xs px-4 py-1 border border-[#E2E2E2] rounded-3xl outline-none pr-10"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-11 cursor-pointer transform -translate-y-1/2 text-gray-600"
        >
          👁
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-[#0A4863] cursor-pointer text-white py-2 rounded-3xl font-semibold"
      >
        Sign up
      </button>
    </form>
  );
};

export default Signup;
