import { useEffect, useState } from "react";
import { Paging, Post, postService } from "../../services/PostService";
import moment from "moment";
import { RiCheckLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import Pagination from "../Pagination";

interface PostResponse {
  data: Post,
  paging: Paging
}

type Props = {
  showPagination: boolean
  limitPost: number
}

const PostItem: React.FC<Post> = (post) => (
  <Link to={`/${post.id}`} title="Detail Post">
    <div className="border p-4 my-2 shadow rounded hover:bg-gray-100 cursor-pointer group">
      <div className="font-semibold">{post.title}</div>
      <div className="text-sm">{
        post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content
      }</div>
      <div className="flex justify-between mt-2">
        <div className="flex items-center">
          <div className={`rounded-full  p-0.5 ${post.published ? 'bg-green-500' : 'bg-gray-500'}`}>
            <RiCheckLine className="text-white" size="13" />
          </div>
          <div className="text-xs invisible group-hover:visible ml-2 italic text-blue-500">Read more</div>
        </div>
        <div className="text-xs text-gray-600">
          {
            moment(post.created_at).format('DD MMMM YYYY, HH:mm')
          }
        </div>
      </div>
    </div >
  </Link>
);

const PostList: React.FC<Props> = ({ showPagination, limitPost }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(limitPost);
  const [search, setSearch] = useState('');

  const fetchPosts = async () => {
    setLoading(true);

    const response = await postService.getAll<PostResponse>(
      page,
      limit,
      search,
    );

    if (response.data && response.data.paging && Array.isArray(response.data.data)) {
      setPosts(response.data.data);

      setTotalPage(response.data.paging.total_page)
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [
    page,
    limit,
    search
  ]);

  return (
    <section className="p-4">
      {loading && (<div className="flex justify-center w-full">
        <Spinner aria-label="Login" size="sm" className="me-2" />
      </div>)}
      {posts.map((post, index) => (
        <PostItem key={index} {...post} />
      ))}

      {showPagination && (
        <div className="mt-4">
          <Pagination totalPages={totalPage} page={page} limit={limit} onChange={(page) => setPage(page)} />
        </div>
      )}
    </section>
  )
}

export default PostList;