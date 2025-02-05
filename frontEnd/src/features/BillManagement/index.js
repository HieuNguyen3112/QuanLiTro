import React, { useState } from 'react';
import BillList from './BillList';
import BillForm from './BillForm';

function BillManagement() {
  const [activeTab, setActiveTab] = useState('billList');

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b">
        <div className="flex gap-4 px-6">
          <button
            className={`py-3 px-4 font-medium border-b-2 transition-colors ${
              activeTab === 'billList'
                ? 'border-teal-700 text-teal-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('billList')}
          >
            Danh sách hóa đơn
          </button>
          
        </div>
      </div>
      <div className="flex-1 bg-gray-50">
        {activeTab === 'billList' ? <BillList /> : <BillForm />}
      </div>
    </div>
  );
}

export default BillManagement;
