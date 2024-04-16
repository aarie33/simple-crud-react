import React, { useEffect, useState } from 'react';
import BackofficeLayout from '../../../layouts/BackofficeLayout';
import { Badge, Spinner, Table } from 'flowbite-react';
import { RiAddLine, RiDeleteBinLine, RiEyeLine, RiPencilLine } from '@remixicon/react';
import { Link } from 'react-router-dom';
import moment from 'moment';

interface User {
  id: number;
  title: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const UserIndex: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      setLoading(false);
    };

    fetchUsers();
  }, [
    page,
    limit,
    search
  ]);

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