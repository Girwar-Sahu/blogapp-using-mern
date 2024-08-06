import React, { useEffect, useState } from "react";
import api from "../axios.config.js";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

function Comment({ comment, onLike, onEdit }) {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/user/${comment.userId}`);
        const data = res.data;
        if (data.success === false) {
          console.log(data.message);
        }
        if (res.statusText === "OK") {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, [comment]);

  const clickEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };
  const handleSave = async () => {
    try {
      const res = await api.put(
        `/comment/edit/${comment._id}`,
        JSON.stringify({ content: editedContent })
      );
      const data = res.data;
      if (res.statusText === "OK") {
        setIsEditing(false);
        onEdit(comment,editedContent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex p-4 border-b border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.photoURL}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : `anonymous user`}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex items-center justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 mb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "Like" : "Likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <button
                    onClick={clickEdit}
                    type="button"
                    className="text-gray-400 hover:text-blue-500"
                  >
                    Edit
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;
