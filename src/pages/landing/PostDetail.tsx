import React, { useEffect, useState } from "react";
import { Post, postService } from "../../services/PostService";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import LandingLayout from "../../layouts/LandingLayout";
import { Comment, commentService } from "../../services/CommentService";
import moment from "moment";
import { RiUserFill } from "@remixicon/react";
import ButtonAction from "../../components/ButtonAction";
import PostList from "../../components/landing/PostList";

const PostDetail: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState<Comment[]>([])
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const response = await postService.getById(Number(id));

      if (response.data) {
        setPost(response.data as Post);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  const fetchComments = async () => {
    const response = await commentService.getAll<Post>(
      Number(id),
      page,
      limit,
      search,
    );
    if (Array.isArray(response.data)) {
      setComments(response.data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [
    id,
    page,
    limit,
    search
  ]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoadingComment(true)

    const response = await commentService.create(
      Number(id),
      comment
    );

    if (response.data) {
      setLoadingComment(false);
      setComment("");
      fetchComments();
      navigate(`/${id}`)
    } else {
      alert(response.error);
      setLoadingComment(false);
    }
  };

  const CommentList: React.FC = () => (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} className="border border-gray-150 p-2 bg-white shadow-sm mb-2">
          <div className="flex">
            <div>
              <div className="p-1 rounded-full bg-gray-400 mr-2">
                <RiUserFill size="14" className="text-white" />
              </div>
            </div>
            <div className="text-sm">
              {comment.content}
            </div>
          </div>
          <div className="flex justify-end text-xs text-gray-500 italic">
            {moment(comment.created_at).fromNow()}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <LandingLayout title="Post">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="col-span-1 sm:col-span-3">
            {loading && (<div className="flex justify-center w-full">
              <Spinner size="sm" className="me-2" />
            </div>)}
            {post !== null && (
              <>
                <div>
                  <h1 className="text-2xl font-semibold">{post.title}</h1>
                  <p className="text-sm text-gray-500">{post.content}</p>
                  <div className="flex justify-end text-xs text-gray-500">
                    {
                      moment(post.created_at).format('DD MMMM YYYY, HH:mm')
                    }
                  </div>
                </div>
                <div className="mt-5 border-t border-gray-150">
                  <h2 className="text-lg font-semibold my-2">Comments</h2>

                  <CommentList />

                  <form onSubmit={handleSubmit} className="mt-4">
                    <textarea
                      className="w-full border border-gray-150 rounded p-2 text-sm"
                      rows={6}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <div className="mt-2 flex justify-end">
                      <ButtonAction
                        loading={loadingComment}
                        label="Add Comment"
                        onClick={() => handleSubmit} />
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
          <div className="col-span-1">
            <PostList showPagination={false} limitPost={4} />
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default PostDetail;
