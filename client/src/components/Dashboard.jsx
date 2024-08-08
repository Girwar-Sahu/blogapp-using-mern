import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../axios.config.js";
import {
  HiArrowNarrowUp,
  HiOutlineUserGroup,
  HiDocumentText,
} from "react-icons/hi";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthsUsers, setLastMonthsUsers] = useState(0);
  const [lastMonthsPosts, setLastMonthsPosts] = useState(0);
  const [lastMonthsComments, setLastMonthsComments] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get(`/user/getusers/${currentUser._id}?limit=5`);
        const data = res.data;
        if (data.success === false) {
          console.log(data.message);
        }
        if (res.statusText === "OK") {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthsUsers(data.lastMonthUser);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await api.get("/post/getposts?limit=5");
        const data = res.data;
        if (data.success === false) {
          console.log(data.message);
        }
        if (res.statusText === "OK") {
          setPosts(data.posts);
          setTotalPosts(data.totalPost);
          setLastMonthsPosts(data.lastMonthPost);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await api.get("/comment/getcomment?limit=5");
        const data = res.data;
        if (data.success === false) {
          console.log(data.message);
        }
        if (res.statusText === "OK") {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthsComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="p-3 mt-2 md:mx-auto">
      <div className="flex flex-wrap gap-8 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-80 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total users</h3>
              <p className="text-2xl ">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthsUsers}
            </span>
            <span className="text-grey-500">Last month</span>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-80 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total posts</h3>
              <p className="text-2xl ">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthsPosts}
            </span>
            <span className="text-grey-500">Last month</span>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-80 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total comments
              </h3>
              <p className="text-2xl ">{totalComments}</p>
            </div>
            <HiChatBubbleBottomCenterText className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthsComments}
            </span>
            <span className="text-grey-500">Last month</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mx-auto gap-4 py-3 justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:gray-800">
          <div className="flex justify-between items-center p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent users</h1>
            <Link to="/dashboard?tab=users">
              <Button outline gradientDuoTone="purpleToPink">
                See all
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users &&
                users.map((user) => (
                  <Table.Row
                    key={user._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      <img
                        className="w-10 h-10 rounded-full bg-gray-500"
                        src={user.photoURL}
                        alt={user.username}
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:gray-800">
          <div className="flex justify-between items-center p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent posts</h1>
            <Link to="/dashboard?tab=post">
              <Button outline gradientDuoTone="purpleToPink">
                See all
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {posts &&
                posts.map((post) => (
                  <Table.Row
                    key={post._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      <img
                        className="w-20 h-10 rounded-sm bg-gray-500"
                        src={post.imageURL}
                        alt={post.slug}
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{post.title}</p>
                    </Table.Cell>
                    <Table.Cell className="w-5">{post.category}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:gray-800">
          <div className="flex justify-between items-center p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent comment</h1>
            <Link to="/dashboard?tab=comment">
              <Button outline gradientDuoTone="purpleToPink">
                See all
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comments</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {comments &&
                comments.map((comment) => (
                  <Table.Row
                    key={comment._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
