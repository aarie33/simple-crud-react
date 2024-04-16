import React from 'react';
import BackofficeLayout from '../../../layouts/BackofficeLayout';

const Dashboard: React.FC = () => {
  return (
    <BackofficeLayout title="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">User</h2>
            <p className="text-xs text-gray-500">Something here soon</p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">User</h2>
            <p className="text-xs text-gray-500">Something here soon</p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">User</h2>
            <p className="text-xs text-gray-500">Something here soon</p>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-3">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">User</h2>
            <p className="text-xs text-gray-500">Something here soon</p>
          </div>
        </div>
      </div>
    </BackofficeLayout>
  );
};

export default Dashboard;