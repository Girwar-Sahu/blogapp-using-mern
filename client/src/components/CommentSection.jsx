import { Alert, Button, Textarea, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios.config.js";
import Comment from "./Comment.jsx";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/comment/getcomments/${postId}`);
        const data = res.data;

        if (data.success === false) {
          console.log(data.message);
        }
        if (res.status === 200) {
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    setCommentError(null);
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await api.post(
        "/comment/create",
        JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        })
      );
      const data = res.data;

      if (data.success === false) {
        setCommentError(data.message);
      }
      if (res.status === 200) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/signin");
        return;
      }
      const res = await api.put(`/comment/like/${commentId}`);
      const data = res.data;
      if (res.status === 200) {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/signin");
        return;
      }
      const res = await api.delete(`/comment/delete/${commentId}`);
      if (res.status === 200) {
        setComments(comments.filter((c) => c._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
      setShowModal(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-xs">
          <p>signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.photoURL}
            alt="user profile"
          />
          <Link
            className="text-xs text-cyan-600 hover:underline"
            to="/dashboard?tab=profile"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-2">
          You must be login to comment
          <Link className="text-blue-500 hover:underline" to="/signin">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="leave a comment.."
            rows="3"
            maxLength="200"
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button type="submit" gradientDuoTone="purpleToBlue" outline>
              Add comment
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments &&
            comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onLike={handleLike}
                onEdit={handleEdit}
                onDelete={(commetId) => {
                  setShowModal(true);
                  setCommentToDelete(commetId);
                }}
              />
            ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400 ">
              Are you sure, you want to delete this comment ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CommentSection;
