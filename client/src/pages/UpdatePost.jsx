import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../firebase.js";
import api from "../axios.config.js";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function UpdatePost() {
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/post/getpost/${postId}`);
        const data = res.data;

        if (data.success === false) {
          setPublishError(data.message);
          return;
        }
        if (res.statusText === "OK") {
          setPublishError(null);
          setFormData(data);
        }
      } catch (error) {
        setPublishError(null);
      }
    };
    fetchPost();
  }, [postId],formData);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload faild");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, imageURL: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishError(null);
    try {
      const res = await api.put(
        `/post/update/${postId}/${currentUser._id}`,
        JSON.stringify(formData)
      );
      const data = res.data;
      console.log(data);

      if (data.success === false) {
        setPublishError(data.message);
        return;
      }
      if (res.statusText === "OK") {
        setPublishError(null);
        navigate(`/post/${data._id}`);
      }
    } catch (error) {
      setPublishError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen ">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between ">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            required
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="webdevelopment">Web Development</option>
            <option value="nextjs">NextJs</option>
            <option value="javascript">javaScript</option>
            <option value="reactjs">reactJs</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c++">C++</option>
            <option value="ai">AI</option>
            <option value="other">Others</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="image/*"
          />
          <Button
            onClick={handleUploadImage}
            type="button"
            gradientDuoTone="purpleToBlue"
            outline
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}

        {formData?.imageURL && (
          <div>
            <img
              src={formData?.imageURL}
              alt="upload"
              className="w-full object-cover"
            />
          </div>
        )}

        <ReactQuill
          value={formData.content}
          className="h-72 mb-12"
          theme="snow"
          placeholder="Write something..."
          onChange={(value) => setFormData({ ...formData, content: value })}
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update post
        </Button>
        {publishError && <Alert color="failure">{publishError}</Alert>}
      </form>
    </div>
  );
}

export default UpdatePost;
