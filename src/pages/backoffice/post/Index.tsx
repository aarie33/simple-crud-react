import React, { useEffect, useState } from 'react';
import BackofficeLayout from '../../../layouts/BackofficeLayout';
import { Badge, Spinner, Table } from 'flowbite-react';
import { RiAddLine, RiDeleteBinLine, RiEyeLine, RiPencilLine } from '@remixicon/react';
import { Link } from 'react-router-dom';
import { Paging, Post, postService } from '../../../services/PostService';
import moment from 'moment';
import ModalConfirm from '../../../components/ModalConfirm';
import Pagination from '../../../components/Pagination';

interface PostResponse {
  data: Post,
  paging: Paging
}

const PostIndex: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<Number | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setLimit(10)

    const response = await postService.getAll<PostResponse>(
      page,
      limit,
      search,
    );

    if (response.data && response.data.paging && Array.isArray(response.data.data)) {
      setPosts(response.data.data);

      setCurrentPage(response.data.paging.current_page)
      setTotalPage(response.data.paging.total_page)
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, [page, limit, search]);

  useEffect(() => {
    setPage(1)
  }, [search])

  const rowNumber = (index: number) => {
    return (currentPage - 1) * limit + index + 1
  }

  const handleOpenModal = (id: Number) => {
    setIsModalOpen(true);
    setSelectedId(id)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedId(null)
  };

  const handleConfirmModal = async () => {
    setIsModalOpen(false)

    const response = await postService.delete(Number(selectedId));

    if (response.data) {
      fetchPosts();
    } else {
      alert(response.error);
    }
    setSelectedId(null)
  }

  return (
    <BackofficeLayout title="Post">
      <div className="bg-white p-4 rounded shadow">
        <div className="flex space-x-2 w-full mb-4">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow rounded border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to="/backoffice/posts/create" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-sm flex items-center space-x-3">
            <RiAddLine size={14} />
            New Post
          </Link>
        </div>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Published</Table.HeadCell>
              <Table.HeadCell>Created at</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y border-b">
              {posts.map((post, index) => (
                <Table.Row key={post.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{rowNumber(index)}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {post.title}
                  </Table.Cell>
                  <Table.Cell>
                    <div className='flex'>
                      <Badge color={post.published ? 'success' : 'gray'}>{post.published ? 'Yes' : 'No'}</Badge>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{moment(post.created_at).format('DD/MM/YYYY, HH:mm')}</Table.Cell>
                  <Table.Cell>
                    <div className="flex justify-center space-x-2">
                      <Link to={`/backoffice/posts/${post.id}/edit`} title="Edit Post">
                        <RiPencilLine className="text-yellow-500 hover:text-yellow-700" size="15px" />
                      </Link>
                      <Link to={`/backoffice/posts/${post.id}`} title="Detail Post">
                        <RiEyeLine className="text-blue-500 hover:text-blue-700" size="15px" />
                      </Link>
                      <div title="Delete Post" onClick={() => handleOpenModal(post.id)} className="cursor-pointer">
                        <RiDeleteBinLine className="text-red-500 hover:text-red-700" size="15px" />
                      </div>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
              {!loading && posts.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={4} className="text-center text-gray-500 text-sm">
                    No data
                  </Table.Cell>
                </Table.Row>
              )}
              {loading && (
                <Table.Row>
                  <Table.Cell colSpan={4} className="text-center text-gray-500 text-sm">
                    <Spinner aria-label="Login" size="sm" />
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>

        <div className="mt-4">
          <Pagination totalPages={totalPage} page={page} limit={limit} onChange={(page) => setPage(page)} />
        </div>
      </div>

      <ModalConfirm title="Are you sure want to delete this post?"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal} />
    </BackofficeLayout>
  );
};

export default PostIndex;