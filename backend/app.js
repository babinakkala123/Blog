require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI,)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);


app.put('/api/blogs/:id', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true }
    );

    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });


    res.json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));