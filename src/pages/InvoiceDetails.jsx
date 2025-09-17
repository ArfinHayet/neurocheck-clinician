"use client"

import AssessmentTable from "@/components/Invoice/AssessmentTable";
import ClinicianDetails from "@/components/Invoice/ClinicianDetails";
import InvoiceHeader from "@/components/Invoice/InvoiceHeader";
import { useParams } from "next/navigation";
import React from "react";

const InvoiceDetails = () => {
  const { assessmentId } = useParams()
  return (
    <div className="p-6 lg:p-0 text-gray-800">
      <InvoiceHeader />
      <ClinicianDetails />
      <AssessmentTable
        assessmentId={assessmentId}
      
      />
    </div>
  );
};

export default InvoiceDetails;
