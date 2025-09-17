"use client";
import { getSubmissionByClinicianId } from "@/api/assessment";
import InvoiceCard from "@/components/Invoice/InvoiceCard";
import { AuthContext } from "@/Provider/AuthProvider";
// import { AuthContext } from "@/Provider/AuthProvider";
import { useContext, useEffect, useState } from "react";

const Invoice = () => {
  const [invoice, setInvoice] = useState([]);
  const { userData } = useContext(AuthContext);

  const groupInvoices = (invoices) => {
  const grouped = {};

  invoices.forEach((item) => {
    const date = new Date(item.createdAt);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const key = `${month}-${year}-${item.assessmentId}`;

    if (!grouped[key]) {
      grouped[key] = {
        month,
        year,
        assessmentId: item.assessmentId,
        assessmentName: item.assessment?.name,
        assessmentCount: 0,
        totalPaidAmount: 0,
      };
    }

    grouped[key].assessmentCount += 1;
    grouped[key].totalPaidAmount += item.paidAmount || 0;
  });

  return Object.values(grouped);
};


  const getInvoice = async () => {
    const data = await getSubmissionByClinicianId(userData?.id);
    // console.log("Submissions:", data);
    const groupedData = groupInvoices(data?.payload || []);
    console.log(groupedData)
    setInvoice(groupedData);
  };

  useEffect(() => {
     if (userData?.id) {
      getInvoice();
    }
  }, [userData?.id]);

  return (
    <div>
       {invoice?.map((item, i) => (
        <InvoiceCard
          key={i}
          month={item.month}
          year={item.year}
          assessmentid={item.assessmentId}
          assessmentCount={item.assessmentCount}
          earnings={item.totalPaidAmount}
          status="Pending"
          invoiceLink={`${item?.assessmentId}`}
        />
      ))}
    </div>
  );
};

export default Invoice;
