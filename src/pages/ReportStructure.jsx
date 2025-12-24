const ReportStructure = ({ data }) => {
  return (
    <div className="w-full text-gray-900 font-sans">

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-4">
        Report of ADHD Adult
      </h2>

      {/* MAIN TABLE */}
      <table className="w-full border border-gray-300 border-collapse text-sm mb-6">
        <tbody>
          <tr>
            <td className="w-[30%] border border-gray-300 p-3 font-medium bg-gray-50">
              Patient Name
            </td>
            <td className="border border-gray-300 p-3">
              {data?.patientName || "XX YY"}
            </td>
          </tr>

          <tr>
            <td className="border border-gray-300 p-3 font-medium bg-gray-50">
              Age
            </td>
            <td className="border border-gray-300 p-3">
              {data?.age || "YY"}
            </td>
          </tr>

          <tr>
            <td className="border border-gray-300 p-3 font-medium bg-gray-50">
              Demographics
            </td>
            <td className="border border-gray-300 p-3">
              {data?.demographics || "XX"}
            </td>
          </tr>

          <tr>
            <td className="border border-gray-300 p-3 font-medium bg-gray-50">
              Clinician Diagnosis
            </td>
            <td className="border border-gray-300 p-3">
              {data?.clinicianDiagnosis || ""}
            </td>
          </tr>

          <tr>
            <td className="border border-gray-300 p-3 font-medium bg-gray-50">
              Clinician Notes from Review
            </td>
            <td className="border border-gray-300 p-3">
              {data?.reviewNotes || ""}
            </td>
          </tr>

          <tr>
            <td className="border border-gray-300 p-3 font-medium bg-gray-50">
              Clinician Notes Post Consultation
            </td>
            <td className="border border-gray-300 p-3">
              {data?.postConsultNotes || ""}
            </td>
          </tr>

          <tr>
            <td className="border border-gray-300 p-3 font-medium bg-gray-50">
              Diagnosis Recommendation
            </td>
            <td className="border border-gray-300 p-3">
              {data?.recommendation || "Exhibits ADHD type XX / YY / ZZ"}
            </td>
          </tr>
        </tbody>
      </table>

      {/* TEXT SECTIONS */}
      <Section
        title="Medical History Summary"
        text={data?.medicalHistory || "Lorem ipsum dolor sit amet..."}
      />

      <Section
        title="ASRS Summary"
        text={data?.asrsSummary || "Key areas rated very often..."}
      />

      <Section
        title="Weiss Rating Summary"
        text={data?.weissSummary || "# of items scored 2 or 3..."}
      />

      <Section
        title="DIVA Summary"
        text={data?.divaSummary || "# of childhood/adulthood criteria met..."}
      />
    </div>
  );
};

/* ================= SUB COMPONENT ================= */
const Section = ({ title, text }) => (
  <div className="mb-4">
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-sm text-gray-800">{text}</p>
  </div>
);

export default ReportStructure;

