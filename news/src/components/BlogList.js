import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axiosInstance.get('/api/blogs');
      setBlogs(response.data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blog-list">
      <h1>Blog Posts</h1>
      <Link to="/create" className="create-link">Create New Post</Link>
      {blogs.map((blog) => (
        <div key={blog._id} className="blog-item">
          <h2>{blog.title}</h2>
          <p>by {blog.author}</p>
          <Link to={`/post/${blog._id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
