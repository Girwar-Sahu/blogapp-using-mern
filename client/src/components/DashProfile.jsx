import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import api from "../axios.config.js";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deletStart,
  deletSuccess,
  deleteFailure,
  signoutSuccess,
} from "../redux/user/userSlice.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadImageProgress, setUploadImageProgress] = useState(null);
  const [uploadImageError, setUploadImageError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [updateDataSuccess, setUpdateDataSuccess] = useState(null);
  const [updateDataError, setUpdateDataError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageUploading(true);
    setUploadImageError(null);
    const storage = getStorage(app);
    const filename = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadImageProgress(progress.toFixed(0));
      },
      (error) => {
        setUploadImageError(
          "Couden't upload Image (File size must be less than 2MB)"
        );
        setUploadImageProgress(null);
        setImageFile(null);
        setImageUrl(null);
        setImageUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setFormData({ ...formData, photoURL: downloadURL });
          setImageUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateDataError(null);
    setUpdateDataError(null);

    if (Object.keys(formData).length === 0) {
      setUpdateDataError("No changes made");
      return;
    }
    if (imageUploading) {
      setUpdateDataError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await api.put(
        `/user/update/${currentUser._id}`,
        JSON.stringify(formData)
      );
      const data = res.data;
      console.log(data);
      if (data.success === false) {
        setUpdateDataError(data.message);
        dispatch(updateFailure(data.message));
      }
      if (res.statusText === "OK") {
        dispatch(updateSuccess(data));
        setUpdateDataSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateDataError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    setShowModal(false);
    try {
      dispatch(deletStart());
      const res = await api.delete(`/user/delete/${currentUser._id}`);
      const data = res.data;
      if (data.success === false) {
        dispatch(deleteFailure(data.message));
      }
      if (res.statusText === "OK") {
        dispatch(deletSuccess());
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await api.post("/auth/signout");
      const data = res.data;
      if (data.success === false) {
        console.log(data.message);
      }
      if (res.statusText === "OK") {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {uploadImageProgress && (
            <CircularProgressbar
              value={uploadImageProgress || 0}
              text={`${uploadImageProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(162,152,199,${uploadImageProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageUrl || currentUser.photoURL}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              uploadImageProgress && uploadImageProgress < 100 && "opacity-60"
            }`}
          />
        </div>
        {uploadImageError && <Alert color="failure">{uploadImageError}</Alert>}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between my-4">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="cursor-pointer">
          Sign out
        </span>
      </div>
      {updateDataSuccess && (
        <Alert color="success" className="mt-5">
          {updateDataSuccess}
        </Alert>
      )}
      {updateDataError && (
        <Alert color="failure" className="mt-5">
          {updateDataError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
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
              Are you sure, you want to delete your account ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteAccount}>
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

export default DashProfile;
