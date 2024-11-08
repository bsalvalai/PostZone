const Post = require('../models/Post');
const Comment = require('../models/Comment');

class postService {

  async createPost({ user, content, images, location }) {
    try {
      const post = new Post({ user, content, images, location });
      await post.save();

      return post;
    } catch (err) {
      console.error("Error en el Servicio createPost: ", err);
      throw new Error("Error en el Servicio createPost: " + err.message);
    }
  }

  async deletePost(_id) {
    try {
      const deletedPost = await Post.findByIdAndDelete(_id);

      if (!deletedPost) {
        throw new Error("Publicación no encontrada");
      }

      return deletedPost;
    } catch (err) {
      console.error("Error en el Servicio deletePost: ", err);
      throw new Error("Error en el Servicio deletePost: " + err.message);
    }
  }

  async addFavoritePost(_id) {
    try {
      const post = await Post.findByIdAndUpdate(
        _id,
        { $inc: { likeCount: 1 } },
        { new: true }
      );

      if (!post) {
        throw new Error("Publicación no encontrada");
      }

      return post;
    } catch (err) {
      console.error("Error en el Servicio addFavoritePost: ", err);
      throw new Error("Error en el Servicio addFavoritePost: " + err.message);
    }
  }

  async removeFavoritePost(_id) {
    try {
      const post = await Post.findByIdAndUpdate(
        _id,
        { $inc: { likeCount: -1 } },
        { new: true }
      );

      if (!post) {
        throw new Error("Publicación no encontrada");
      }

      return post;
    } catch (err) {
      console.error("Error en el Servicio removeFavoritePost: ", err);
      throw new Error("Error en el Servicio removeFavoritePost: " + err.message);
    }
  }

  async addCommentPost(postId, { user, message }) {
    try {
      const comment = new Comment({ post: postId, user, message });
      await comment.save();

      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: comment._id }, $inc: { commentCount: 1 } },
        { new: true }
      );

      if (!post) {
        throw new Error("Publicación no encontrada");
      }

      return post;
    } catch (err) {
      console.error("Error en el Servicio addCommentPost: ", err);
      throw new Error("Error en el Servicio addCommentPost: " + err.message);
    }
  }

  async removeCommentPost(postId, commentId) {
    try {
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      if (!deletedComment) {
        throw new Error("Comentario no encontrado");
      }

      const post = await Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: commentId }, $inc: { commentCount: -1 } },
        { new: true }
      );

      if (!post) {
        throw new Error("Publicación no encontrada");
      }

      return post;
    } catch (err) {
      console.error("Error en el Servicio removeCommentPost: ", err);
      throw new Error("Error en el Servicio removeCommentPost: " + err.message);
    }
  }
}

module.exports = new postService();
