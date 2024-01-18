import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://blog-ok12.onrender.com/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="min-h-screen flex items-center  bg-[url(https://img.freepik.com/free-vector/food-doodle-frame-beige-background-vector_53876-169007.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704844800&semt=ais)] bg-no-repeat bg-cover justify-center border-slate-300">
        <div className="bg-slate-50  flex rounded-2xl shadow-lg max-w-3xl p-8 px-7 items-center">
          <div
            className="relative mb-3 justify-center"
            data-te-input-wrapper-init
          >
            <div>
              <h1 className="flex justify-center font-bold text-red-600 text-3xl m-6 mb-8">
                Create A Post
              </h1>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                className="w-full px-5 mb-8 mt-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-black placeholder-gray-500 text-sm focus:outline-none"
                name="title"
                value={inputs.title}
                onChange={handleChange}
                placeholder="Title"
                required
              />

              <input
                className="w-full px-5 mb-8 mt-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-black placeholder-gray-500 text-sm focus:outline-none"
                name="description"
                value={inputs.description}
                onChange={handleChange}
                placeholder="Description"
                type="text"
                required
              />
              <input
                className="w-full px-5 mb-8 mt-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-black placeholder-gray-500 text-sm focus:outline-none"
                name="image"
                value={inputs.image}
                onChange={handleChange}
                placeholder="Image URL"
                required
              />
              <button
                className="mt-4 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-3 rounded-lg hover:bg-blue-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                type="submit"
              >
                <span className="ml-3 hover:text-xl hover:text-black">
                  CREATE
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateBlog;
