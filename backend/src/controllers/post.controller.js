const postService = require('../services/post.service.js');

const createPost = async (req, res) => {
  try {
    const { user, content, images, location } = req.body;
    const post = await postService.createPost({ user, content, images, location });

    res.status(201).json(post);
  } catch (err) {
    console.error("Error en el Controlador createPost: " + err);
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedPost = await postService.deletePost(_id);

    res.status(200).json(deletedPost);
  } catch (err) {
    console.error("Error en el Controlador deletePost: " + err);
    res.status(500).json({ error: err.message });
  }
};

const addFavoritePost = async (req, res) => {
  try {
    const { _id } = req.params;
    const userId = req.user._id;
    const updatedPost = await postService.addFavoritePost(_id, userId);

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error("Error en el Controlador addFavoritePost: " + err);
    res.status(500).json({ error: err.message });
  }
};

const removeFavoritePost = async (req, res) => {
  try {
    const { _id } = req.params;
    const userId = req.user._id;
    const updatedPost = await postService.removeFavoritePost(_id, userId);

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error("Error en el Controlador removeFavoritePost: " + err);
    res.status(500).json({ error: err.message });
  }
};

const addCommentPost = async (req, res) => {
  try {
    const { _id } = req.params;
    const userId = req.user._id;
    const { message } = req.body;
    const updatedPost = await postService.addCommentPost(_id, { userId, message });

    res.status(201).json(updatedPost);
  } catch (err) {
    console.error("Error en el Controlador addCommentPost: " + err);
    res.status(500).json({ error: err.message });
  }
};

const removeCommentPost = async (req, res) => {
  try {
    const { _id } = req.params;
    const userId = req.user._id;
    const { commentId } = req.body;
    const updatedPost = await postService.removeCommentPost(_id, userId, commentId);
    
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error("Error en el Controlador removeCommentPost: " + err);
    res.status(500).json({ error: err.message });
  }
};

const getPostComments = async (req, res) => {
  try {
    const postId = req.params._id;
    const comments = await postService.getPostComments(postId);

    res.status(200).json(comments);
  } catch (err) {
    console.error("Error en el Controlador getPostComments: " + err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPost,
  deletePost,
  addFavoritePost,
  removeFavoritePost,
  addCommentPost,
  removeCommentPost,
  getPostComments
};
