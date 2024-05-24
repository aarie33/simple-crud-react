import React, { useState, useEffect } from "react";
import BackofficeLayout from "../../../layouts/BackofficeLayout";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { Post, postService } from "../../../services/PostService";

const PostDetail: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

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

  return (
    <BackofficeLayout title="Post Detail">
      <div className="bg-white rounded shadow p-4">
        {loading && (<div className="flex justify-center w-full">
          <Spinner aria-label="Login" size="sm" className="me-2" />
        </div>)
        }
        {!loading && (
          <>
            <div className="h4 font-semibold">
              {post?.title}
            </div>
            <div className="whitespace-pre-line">
              {post?.content}
            </div>
          </>
        )
        }

        <div className="mt-4 flex justify-end space-x-2">
          <Link to="/backoffice/posts" className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded text-sm">
            Back
          </Link>
        </div>
      </div>
    </BackofficeLayout>
  );
};

export default PostDetail;