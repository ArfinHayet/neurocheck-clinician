
import InvoiceCard from "@/components/ui-reusable/InvoiceCard";
import { FaCalendarAlt } from "react-icons/fa";

const Invoice = () => {
    return (
        <div>
            <InvoiceCard
            month="July"
        year="2025"
        assessmentCount={22}
        earnings="130.99"
        status="Pending"
        invoiceLink="/invoice"/>
      </div>
  );
};

export default Invoice;




