import React, { useState } from 'react';
import BackofficeLayout from '../../../layouts/BackofficeLayout';
import { RiAddLine } from '@remixicon/react';
import { Link } from 'react-router-dom';

const UserIndex: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <BackofficeLayout title="User">
      <div className="bg-white p-4 rounded shadow">
        <div className="flex space-x-2 w-full mb-4">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow rounded border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to="/backoffice/users/create" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-sm flex items-center space-x-3">
            <RiAddLine size={14} />
            New User
          </Link>
        </div>
        <div className="overflow-x-auto">
          soon here
        </div>
      </div>
    </BackofficeLayout>
  );
};

export default UserIndex;