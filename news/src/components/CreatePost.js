import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import './CreatePost.css';

const CreatePost = () => {
    const [post, setPost] = useState({ title: '', content: '', author: '' });
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await axiosInstance.post('/api/blogs', post);
        navigate('/');
      };

      return (
        <div className="create-post">
            <h1>Create New Post</h1>
            <form onSubmit={handleSubmit}>
            <input
            type="text"
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          />

<textarea
          placeholder="Content"
          value={post.content}

            onChange={(e) => setPost({ ...post, content: e.target.value })}
        ></textarea>

<input
          type="text"
          placeholder="Author"
          value={post.author}
          onChange={(e) => setPost({ ...post, author: e.target.value })}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;