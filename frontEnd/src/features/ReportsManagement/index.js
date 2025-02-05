import React, { useState } from 'react';
import OverallReport from './OverallReport';


function ReportsManagement() {
  const [activeTab, setActiveTab] = useState('overall');

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b">
        <div className="flex gap-4 px-6">

        </div>
      </div>
      <div className="flex-1 bg-gray-50 p-6">
        {activeTab === 'overall' && <OverallReport />}
      </div>
    </div>
  );
}

export default ReportsManagement;

