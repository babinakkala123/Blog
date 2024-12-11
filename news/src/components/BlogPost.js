import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import './Blogpost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({ author: '', content: '' });

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axiosInstance.get(`/api/blogs/${id}`);
      setPost(response.data);
    };
    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const response = await axiosInstance.post(`/api/blogs/${id}/comments`, comment);
    setPost(response.data);
    setComment({ author: '', content: '' });
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <p>by {post.author}</p>
      <div>{post.content}</div>
      <h3>Comments</h3>
      <ul>
        {post.comments.map((comment, index) => (
          <li key={index}>
            <strong>{comment.author}</strong>: {comment.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={comment.author}
          onChange={(e) => setComment({ ...comment, author: e.target.value })}
        />
        <textarea
          placeholder="Your Comment"
          value={comment.content}
          onChange={(e) => setComment({ ...comment, content: e.target.value })}
        ></textarea>
        <button type="submit">Add Comment</button>
      </form>
      <Link to="/">Back to Posts</Link>
    </div>
  );
};

export default BlogPost;
