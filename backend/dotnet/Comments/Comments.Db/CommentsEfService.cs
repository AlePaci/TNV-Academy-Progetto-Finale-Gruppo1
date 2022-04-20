
using System.Collections.Generic;
using System.Linq;
using Comments.Core.Model;
using Comments.Core.Service;
using Comments.Db.Entities;
using Comments.Db.Mappers;


namespace Comments.Db
{
    /// <summary>
    /// Encapsulation of methods for dialogue with database
    /// </summary>
    public class CommentsEfService : ICommentsStorage
    {
        private CommentsAppContext _context;

        public CommentsEfService()
        {
            _context = new();
            _context.Database.EnsureCreated();
        }
        /// <summary>
        /// Method to save a comment in the database
        /// </summary>
        /// <param name="userId">properties of the comment</param>
        /// <param name="movieId">properties of the comment</param>
        /// <param name="commentText">properties of the comment</param>
        /// <returns>saved comment with id</returns>
        public Comment CreateComment(int userId, int movieId, string commentText)
        {
            var comment = new CommentEntity()
            {
                UserId = userId,
                MovieId = movieId,
                CommentText = commentText
            };
            var createdComment = _context.Comments.Add(comment);
            _context.SaveChanges();
            return DbCommentMapper.From(createdComment.Entity);
        }
        /// <summary>
        /// Method to retrieve all comments from database
        /// </summary>
        /// <returns>list of all comments</returns>
        public List<Comment> GetAllComments()
        {
            var entityList = _context.Comments;
            return entityList.Select(c =>DbCommentMapper.From(c)).ToList();
        } 
        /// <summary>
        /// Method to search fo a comment whit id
        /// </summary>
        /// <param name="commentId">id used in search</param>
        /// <returns> comment or null if id not found</returns>
        public Comment? GetCommentById(int commentId)
        {
            var commentEntity = _context.Comments.Find(commentId);
            if (commentEntity != null) return DbCommentMapper.From(commentEntity);
            return null;
        }
        /// <summary>
        /// Method to search for all comment with same userId
        /// </summary>
        /// <param name="userId"> user id used in search</param>
        /// <returns>List of all comments found</returns>
        public List<Comment> GetCommentsByUserId(int userId)
        { 
            var entityList = _context.Comments.Where(c => c.UserId == userId).ToList();
            return entityList.Select(c=>DbCommentMapper.From(c)).ToList();
        }
        /// <summary>
        /// Method to search for all comment whit same movie id
        /// </summary>
        /// <param name="movieId">movie id used in the search</param>
        /// <returns>list of comment found</returns>
        public List<Comment> GetCommentsByMovieId(int movieId)
        {
            var entityList =  _context.Comments.Where(c => c.MovieId == movieId).ToList();
            return entityList.Select(c =>DbCommentMapper.From(c)).ToList();
        }
        /// <summary>
        /// method to update a comment and save changes in database.
        /// </summary>
        /// <param name="commentId">id of the comment to update</param>
        /// <param name="commentText">new text for comment</param>
        /// <returns>updated comment or null if not found</returns>
        public Comment? UpdateComment(int commentId, string commentText)
        {
            var comment = _context.Comments.Find(commentId);
            if (comment != null)
            {
                comment.CommentText = commentText;
                _context.SaveChanges();
            }
            if (comment == null) return null;
            return DbCommentMapper.From(comment);
        }
        /// <summary>
        /// Method to delete comment from database
        /// </summary>
        /// <param name="commentId">id of comment to delete</param>
        /// <returns>true or false</returns>
        public bool DeleteComment(int commentId)
        {
            var comment = _context.Comments.Find(commentId);
            if (comment == null) return false;
            _context.Comments.Remove(comment);
            _context.SaveChanges();
            return true;
        }
        
    }
}

