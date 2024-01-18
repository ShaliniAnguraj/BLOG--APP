import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  // get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`https://blog-ok12.onrender.com/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

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
      const { data } = await axios.put(`https://blog-ok12.onrender.com/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(blog);
  return (
    <>
      <section className="min-h-screen flex items-center justify-center border-slate-300">
        <div className="bg-slate-50  flex rounded-2xl shadow-lg max-w-3xl p-8 px-7 items-center">
          <div
            className="relative mb-3 justify-center"
            data-te-input-wrapper-init
          >
            <div>
              <h1 className="flex justify-center font-bold text-red-600 text-3xl m-6 mb-8">
                Update your Post
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
                className="mt-4 tracking-wide font-semibold bg-orange-300 text-gray-100 w-full py-3 rounded-lg hover:bg-orange-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                type="submit"
              >
                <span className="ml-3 hover:text-xl hover:text-black">
                  Update
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
