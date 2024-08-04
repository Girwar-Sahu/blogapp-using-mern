import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../axios.config.js";
import { Button, Spinner } from "flowbite-react";

function Post() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/post/getpost/${postId}`);
        const data = res.data;
       

        if (data.success === false) {
          setError(data.message);
          setLoading(false);
        }
        if (res.statusText === "OK") {
          setPost(data);
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        className="self-center mt-5"
        to={`/search?category=${post && post.category}`}
      >
        <Button color="red" size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
        src={post && post.imageURL}
        alt={post && post.slug}
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-3xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)}mins read
        </span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: post && post.content }}
        className="p-3 mx-auto max-w-3xl w-full post-content"
      ></div>
    </main>
  );
}

export default Post;
