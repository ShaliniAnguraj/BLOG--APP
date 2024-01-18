import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`https://blog-ok12.onrender.com/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex p-16 justify-center border border-gray-300 rounded-lg shadow">
      <div>
        {isUser && (
          <div className="flex p-4 justify-end">
            <MdModeEditOutline
              className=" text-2xl m-2 hover:text-emerald-700"
              onClick={handleEdit}
            ></MdModeEditOutline>
            <MdDelete
              className="text-red-500 text-2xl m-2"
              onClick={handleDelete}
            >
              {" "}
            </MdDelete>
          </div>
        )}
        <div className=" max-w-xl bg-white border rounded-lg shadow-2xl">
          <div className="flex">
            <div className="justify-center">
              <p>
                <RxAvatar className=" text-6xl text-red-600 m-2 my-3">
                  {username}
                </RxAvatar>
              </p>
            </div>
            <div>
            <p className="mt-6 mx-3 text-black">{username}</p>

              <p className="mt-2 mx-3">{time}</p>
            </div>
          </div>

          <div>
            <img className="rounded-t-lg" src={image} alt="" />
          </div>
          <div className="p-5">
            <h5 className=" my-3 text-2xl font-bold tracking-tight text-red-600">
              {title}
            </h5>

            <p className="mb-3 font-normal text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

