"use client";

import Header from "@/components/ui-reusable/Header";
import AssessmentCard from "@/components/ui-reusable/AssesmentCard";
const Assessment = () => {
   const handleView = () => alert('View assessment clicked');
  const handleAccept = () => alert('Accept case clicked');
  return (
    <div>
        <Header
        title="Assessment queue"
        description="Your central hub for tracking assessments, reviewing patient insights, and managing your schedule"
        // onMessageClick={handleMessageClick}
        // onNotificationClick={handleNotificationClick}
      />
      <div className="px-8">
       <AssessmentCard
        name="Oliver Bennett"
        age={15}
        timeAgo="3h 43min ago"
        status="Accepted"
        childCondition="Child ADHD"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        onViewFullAssessment={handleView}
        onAcceptCase={handleAccept}
      />
      </div>
      

       
    </div>
  );
};

export default Assessment;


