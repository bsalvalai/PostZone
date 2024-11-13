const Post = require('../models/Post');
const Comment = require('../models/Comment');

class postService {

  async createPost({ user, content, images, location }) {
    try {
      let currentTime = Date.now();
      let date = new Date(currentTime);

      // Formateo la fecha como "DD/MM/AAAA"
      let day = String(date.getDate()).padStart(2, '0'); // Aseguro que el día tenga dos dígitos
      let month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() devuelve 0 para enero, por eso sumo 1
      let year = date.getFullYear();
      let formattedDate = `${day}/${month}/${year}`;

      const post = new Post({ user, content, images, date: formattedDate, location });
      await post.save();

      return post;
    } catch (err) {
      console.error("Error en el Servicio createPost: " + err);
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
      console.error("Error en el Servicio deletePost: " + err);
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
      console.error("Error en el Servicio addFavoritePost: " + err);
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
      console.error("Error en el Servicio removeFavoritePost: " + err);
      throw new Error("Error en el Servicio removeFavoritePost: " + err.message);
    }
  }

  async addCommentPost(postId, { user, message }) {
    try {
      let currentTime = Date.now();
      let date = new Date(currentTime);

      // Formateo la fecha como "DD/MM/AAAA"
      let day = String(date.getDate()).padStart(2, '0'); // Aseguro que el día tenga dos dígitos
      let month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() devuelve 0 para enero, por eso sumo 1
      let year = date.getFullYear();
      let formattedDate = `${day}/${month}/${year}`;

      const comment = new Comment({ post: postId, user, message, date: formattedDate });
      await comment.save();

      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { postComments: comment._id }, $inc: { commentCount: 1 } },
        { new: true }
      );

      if (!post) {
        throw new Error("Publicación no encontrada");
      }

      return post;
    } catch (err) {
      console.error("Error en el Servicio addCommentPost: " + err);
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
        { $pull: { postComments: commentId }, $inc: { commentCount: -1 } },
        { new: true }
      );

      if (!post) {
        throw new Error("Publicación no encontrada");
      }

      return post;
    } catch (err) {
      console.error("Error en el Servicio removeCommentPost: " + err);
      throw new Error("Error en el Servicio removeCommentPost: " + err.message);
    }
  }

  async getPostComments(postId) {
    try {
      const post = await Post.findById(postId).populate({
        path: 'postComments',
        model: 'Comment'
      });
  
      if (!post) {
        throw new Error("Publicación no encontrada");
      }
  
      return post.postComments;
    } catch (err) {
      console.error("Error en el Servicio getPostComments: " + err);
      throw new Error("Error en el Servicio getPostComments: " + err.message);
    }
  }

}

module.exports = new postService();
