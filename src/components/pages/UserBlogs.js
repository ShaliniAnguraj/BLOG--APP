import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../Home/Header/BlogCard"

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`https://blog-ok12.onrender.com/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <>
    <div>
    {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <div className="flex h-screen justify-center items-center  bg-[url(https://img.freepik.com/free-vector/hand-drawn-fast-food-background_23-2149013388.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704844800&semt=ais)] bg-no-repeat bg-cover">
        <h1 className="text-5xl">You Haven't Created a blog </h1>
        </div>
      )}
    </div>
    </>
  )
}

export default UserBlogs