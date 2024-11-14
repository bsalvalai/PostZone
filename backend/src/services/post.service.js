const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const userService = require('../services/user.service.js');

class postService {

  async createPost({ userId, content, images, location }) {
    try {
      let currentTime = Date.now();
      let date = new Date(currentTime);

      // Formateo la fecha como "DD/MM/AAAA"
      let day = String(date.getDate()).padStart(2, '0');  // Aseguro que el día tenga dos dígitos
      let month = String(date.getMonth() + 1).padStart(2, '0');  // getMonth() devuelve 0 para enero, por eso sumo 1
      let year = date.getFullYear();
      let formattedDate = `${day}/${month}/${year}`;

      const post = new Post({ user: userId, content, images, date: formattedDate, location });
      await post.save();

      // Agrego el post al array de posts del usuario
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { userPosts: post._id } },
        { new: true }
      );
  
      await userService.updateGamificationLevel(userId);  // Actualizo el nivel de gamificación

      return post;
    } catch (err) {
      console.error("Error en el Servicio createPost: " + err);
      throw new Error("Error en el Servicio createPost: " + err.message);
    }
  }

  async deletePost(postId) {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        console.error("Publicación no encontrada");
        throw new Error("Publicación no encontrada");
      }

      // Elimino el post del array de posts del usuario
      const userId = post.user;
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { userPosts: postId } },
        { new: true }
      );
  
      await userService.updateGamificationLevel(userId);  // Actualizo el nivel de gamificación
      const deletedPost = await Post.findByIdAndDelete(postId);

      return { message: "La publicación se eliminó con éxito" };
    } catch (err) {
      console.error("Error en el Servicio deletePost: " + err);
      throw new Error("Error en el Servicio deletePost: " + err.message);
    }
  }

  async addFavoritePost(postId, userId) {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        console.error("Publicación no encontrada");
        throw new Error("Publicación no encontrada");
      }

      const user = await User.findById(userId);
      if (!user) {
        console.error("Usuario no encontrado");
        throw new Error("Usuario no encontrado");
      }

      // Verifico si el post ya está en los favoritos del usuario
      if (user.favoritePosts.includes(postId)) {
        console.error("La publicación ya está en favoritos");
        throw new Error("La publicación ya está en favoritos");
      }

      user.favoritePosts.push(postId);  // Agrego el post a favoritos del usuario
      await user.save();

      post.likeCount += 1;  // Aumento el contador de likes del post
      await post.save();

      return { message: "La publicación se agregó a favoritos con éxito" };
    } catch (err) {
      console.error("Error en el Servicio addFavoritePost: " + err);
      throw new Error("Error en el Servicio addFavoritePost: " + err.message);
    }
  }

  async removeFavoritePost(postId, userId) {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        console.error("Publicación no encontrada");
        throw new Error("Publicación no encontrada");
      }

      const user = await User.findById(userId);
      if (!user) {
        console.error("Usuario no encontrado");
        throw new Error("Usuario no encontrado");
      }

      // Verifico si el post está en los favoritos del usuario
      const index = user.favoritePosts.indexOf(postId);
      if (index === -1) {
        console.error("La publicación no está en favoritos");
        throw new Error("La publicación no está en favoritos");
      }

      user.favoritePosts.splice(index, 1);  // Elimino el post de los favoritos del usuario
      await user.save();

      post.likeCount -= 1;  // Disminuyo el contador de likes del post
      await post.save();

      return { message: "La publicación se eliminó de favoritos con éxito" };
    } catch (err) {
      console.error("Error en el Servicio removeFavoritePost: " + err);
      throw new Error("Error en el Servicio removeFavoritePost: " + err.message);
    }
  }

  async addCommentPost(postId, { userId, message }) {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        console.error("Publicación no encontrada");
        throw new Error("Publicación no encontrada");
      }

      let currentTime = Date.now();
      let date = new Date(currentTime);

      // Formateo la fecha como "DD/MM/AAAA"
      let day = String(date.getDate()).padStart(2, '0'); // Aseguro que el día tenga dos dígitos
      let month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() devuelve 0 para enero, por eso sumo 1
      let year = date.getFullYear();
      let formattedDate = `${day}/${month}/${year}`;

      const comment = new Comment({ post, user: userId, message, date: formattedDate });
      await comment.save();

      // Agrego el comentario al array de comentarios del post
      post.postComments.push(comment._id);
      await post.save();
  
      // Incremento el contador de comentarios del usuario
      const user = await User.findByIdAndUpdate(
        userId,
        { $inc: { commentCount: 1 } },
        { new: true }
      );
  
      await userService.updateGamificationLevel(userId);  // Actualizo el nivel de gamificación

      return comment;
    } catch (err) {
      console.error("Error en el Servicio addCommentPost: " + err);
      throw new Error("Error en el Servicio addCommentPost: " + err.message);
    }
  }

  async removeCommentPost(postId, commentId) {
    try {
      const post = await Post.findById(postId);
      
      if (!post) {
        console.error("Publicación no encontrada");
        throw new Error("Publicación no encontrada");
      }

      // Verifico si el comentario existe en el array de comentarios del post
      const commentIndex = post.postComments.indexOf(commentId);
      if (commentIndex === -1) {
        console.error("Comentario no encontrado en la publicación");
        throw new Error("Comentario no encontrado en la publicación");
      }

      // Elimino el comentario del array de comentarios del post
      post.postComments.splice(commentIndex, 1);
      await post.save();

      // Elimino el comentario de la base de datos
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      if (!deletedComment) {
        console.error("Comentario no encontrado");
        throw new Error("Comentario no encontrado");
      }

      // Decremento el contador de comentarios del usuario
      const userId = deletedComment.user;
      const user = await User.findByIdAndUpdate(
        userId,
        { $inc: { commentCount: -1 } },
        { new: true }
      );
  
      await userService.updateGamificationLevel(userId);  // Actualizo el nivel de gamificación

      return { message: "El comentario se eliminó de la publicación con éxito" };
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
        console.error("Publicación no encontrada");
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
