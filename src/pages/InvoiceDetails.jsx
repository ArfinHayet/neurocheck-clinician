import AssessmentTable from '@/components/Invoice/AssessmentTable';
import ClinicianDetails from '@/components/Invoice/ClinicianDetails';
import InvoiceHeader from '@/components/Invoice/InvoiceHeader';
import React from 'react';

const InvoiceDetails = () => {
    return (
        <div className='min-h-screen text-gray-800'>
      <InvoiceHeader />
      <ClinicianDetails />
      <AssessmentTable />
  

        </div>
    );
};

export default InvoiceDetails;