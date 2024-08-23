import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../axios.config.js";
import { Button, Spinner } from "flowbite-react";
import CalltoAction from "../components/CalltoAction.jsx";
import CommentSection from "../components/CommentSection.jsx";
import PostCard from "../components/PostCard.jsx";

function Post() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPost, setRecentPost] = useState(null);

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
        if (res.status === 200) {
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

  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        const res = await api.get(`/post/getposts?limit=3`);
        const data = res.data;

        if (data.success === false) {
          console.log(data.message);
        }
        if (res.status === 200) {
          setRecentPost(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPost();
  }, []);

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
        <Button color="gray" size="xs">
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
      <div className="max-w-4xl mx-auto w-full">
        <CalltoAction />
      </div>
      <CommentSection postId={post && post._id} />
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPost &&
            recentPost.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}

export default Post;
