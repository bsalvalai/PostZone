const User = require('../models/User'); // Importa el modelo de usuario
const Post = require('../models/Post'); // Asegúrate de importar el modelo de Post

class TimelineService {
    async getTimeline(userId, limit = 20, skip = 0) {
        try {
            // Encuentra el usuario actual y sus usuarios seguidos
            const user = await User.findById(userId).populate('followingUsers', '_id'); // Popula los IDs de los seguidos

            console.log('User ID:', userId);

            // Verifica si el usuario existe
            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            // Recoge los IDs de los usuarios seguidos
            const followedUserIds = user.followingUsers.map(followedUser => followedUser._id);

            // Si el usuario no sigue a nadie, devuelve un array vacío
            if (followedUserIds.length === 0) {
                console.log("El usuario no sigue a nadie.");
                return [];
            }

            // Obtén los posts de los usuarios seguidos
            const posts = await Post.find({ user: { $in: followedUserIds } })
                .sort({ createdAt: -1 }) // Ordena los posts por fecha
                .limit(limit)
                .skip(skip)
                .populate({
                    path: 'postComments',
                    model: 'Comment',
                    options: { sort: { createdAt: -1 } }
                });

            return posts;

        } catch (err) {
            console.error("Error en el Servicio getTimeline: " + err);
            throw new Error("Error en el Servicio getTimeline: " + err.message);
        }
    }
}

module.exports = new TimelineService();
