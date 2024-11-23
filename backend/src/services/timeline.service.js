const User = require('../models/User');
const Post = require('../models/Post');

class timelineService {

  async getTimeline(userId, limit = 10, skip = 0) {
    try {
      // Encuentro el usuario actual y obtengo los IDs de los usuarios que sigue
      const user = await User.findById(userId).populate('followingUsers', '_id');

      if (!user) {
        console.error("Usuario no encontrado");
        throw new Error("Usuario no encontrado");
      }

      // Extraigo los IDs de los usuarios seguidos y el propio userId
      const followedUserIds = user.followingUsers.map(followedUser => followedUser._id);
      followedUserIds.push(userId);

      // Obtengo los posts de los usuarios seguidos y del usuario autenticado
      const posts = await Post.find({ user: { $in: followedUserIds } })
        .sort({ createdAt: -1 })  // Ordeno los posts por fecha de creación (descendente)
        .limit(limit)
        .skip(skip)
        .populate({
          path: 'postComments',
          model: 'Comment',
          options: { sort: { createdAt: -1 } }  // Ordeno los comentarios en cada post
        });

      return posts;

    } catch (err) {
      console.error("Error en el Servicio getTimeline: " + err);
      throw new Error("Error en el Servicio getTimeline: " + err.message);
    }
  }
  
}

module.exports = new timelineService();
