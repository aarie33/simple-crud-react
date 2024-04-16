import React, { useState } from "react";
import BackofficeLayout from "../../../layouts/BackofficeLayout";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { postService } from "../../../services/PostService";

const PostCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true)

    const response = await postService.create(
      title,
      content,
      published
    );

    if (response.data) {
      setLoading(false);
      navigate('/backoffice/posts')
    } else {
      alert(response.error);
      setLoading(false);
    }
  };

  return (
    <BackofficeLayout title="Create Post">
      <div className="bg-white rounded shadow p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              className="mt-1 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-sm"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Published</label>

            <div className="flex items-center space-x-2">
              <input
                id="publish-input"
                type="checkbox"
                className="mt-1 block"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              <label htmlFor="publish-input">
                {published && "Yes" || "No"}
              </label>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Link to="/backoffice/posts" className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded text-sm">
              Back
            </Link>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-sm"
            >
              {loading && <Spinner aria-label="Login" size="sm" className="me-2" />}
              Save
            </button>
          </div>
        </form>
      </div>
    </BackofficeLayout>
  );
}

export default PostCreate;