using Comments.Core.Model;
using Comments.Db.Entities;

namespace Comments.Db.Mappers
{
    /// <summary>
    /// Encapsulation of methods to convert object from the business layer to entity of database layer and vice versa.
    /// </summary>
    public static class DbCommentMapper
    {
        /// <summary>
        /// Converts business layer object in DataBase entity object
        /// </summary>
        /// <param name="comment">object from the business layer</param>
        /// <returns>DataBase Entity</returns>
        public static CommentEntity From(Comment comment)
        {
            return new()
            {
                Id = comment.Id,
                UserId = comment.UserId,
                MovieId = comment.MovieId,
                CommentText = comment.CommentText
            };
        }
        /// <summary>
        /// Converts DataBase entity object in business layer object
        /// </summary>
        /// <param name="comment">DataBase Entity</param>
        /// <returns>Business Layer Object</returns>
        public static Comment From(CommentEntity comment)
        {
            return new()
                {
                    Id = comment.Id,
                    UserId = comment.UserId,
                    MovieId = comment.MovieId,
                    CommentText = comment.CommentText
                };
        }
    }
}

