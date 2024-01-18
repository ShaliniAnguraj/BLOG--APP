import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Home/Header/Header";
import Loginpage from "./components/pages/Loginpage";
import Registerpage from "./components/pages/Registerpage";
//import Homepage from "./components/pages/Homepage";
import BlogDetails from "./components/pages/BlogDetails";
import Blogs from "./components/pages/Blogs";
import CreateBlog from "./components/pages/CreateBlog";
import UserBlogs from "./components/pages/UserBlogs";
import Homepage from "./components/pages/Homepage";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/tabs" element={<Homepage/>} />

        <Route path="/my-blogs" element={<UserBlogs/>} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<Registerpage />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <Toaster />

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
