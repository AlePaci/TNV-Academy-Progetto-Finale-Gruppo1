using System.Collections.Generic;
using System.Linq;
using Comments.Core.Exceptions;
using Comments.Core.Model;


namespace Comments.Core.Service.Impl
{
    /// <summary>
    /// Encapsulation of methods that receive data from the restApi layer and apply business logic before sending to database Layer
    /// </summary>
    public class CommentsCoreService 
    {
        private ICommentsStorage _efService;

        public CommentsCoreService(ICommentsStorage storage)
        {
            _efService = storage;
        }
        /// <summary>
        ///  Method to create and save a new comment, apply controls and redirects to database layer
        /// </summary>
        /// <param name="userId">used as new comment properties</param>
        /// <param name="movieId">used as new comment properties</param>
        /// <param name="commentText">used as new comment properties</param>
        /// <returns>created comment </returns>
        /// <exception cref="InvalidCommentTextLenghtException">if the text dose not respect Min Max lenght</exception>
        public Comment CreateComment(int userId,int movieId,string commentText)
        {
            if (commentText.Length is > Comment.MIN_COMMENT_SIZE or < Comment.MIN_COMMENT_SIZE)
            {
                return _efService.CreateComment(userId, movieId, commentText);
            }
            throw new InvalidCommentTextLenghtException(commentText.Length);
        }
        /// <summary>
        /// Method to retrive all comments, apply controls and redirects to database layer
        /// </summary>
        /// <returns>List of comment if is not empty</returns>
        /// <exception cref="DataBaseEmptyException">if empty</exception>
        public List<Comment> GetAllComments()
        {
            var commentList = _efService.GetAllComments();
            if(commentList.Count != 0) return commentList;
            throw new DataBaseEmptyException();
        }
        /// <summary>
        /// Method to search for comment by id, apply controls and redirects to database layer
        /// </summary>
        /// <param name="commentId">id used in search</param>
        /// <returns>comment if id existed</returns>
        /// <exception cref="CommentNotFoundException">if the id was not found</exception>
        public Comment GetCommentById(int commentId)
        {
            var comment = _efService.GetCommentById(commentId);
            if (comment != null) return comment;
            throw new CommentNotFoundException("id", commentId);
        }
        /// <summary>
        /// Method to search for all comment whit same userId, apply controls and redirects to database layer
        /// </summary>
        /// <param name="userId">user Id used for search</param>
        /// <returns>List of comments if id existed</returns>
        /// <exception cref="CommentNotFoundException">if the id was not found</exception>
        public List<Comment> GetCommentsByUserId(int userId)
        {
            var commentList = _efService.GetCommentsByUserId(userId);
            if (commentList.Count != 0) return commentList.ToList();
            throw new CommentNotFoundException("userId", userId);
        }
        /// <summary>
        /// Method to search for all comment whit same movie Id, apply controls and redirects to database layer
        /// </summary>
        /// <param name="movieId">movie Id used for search</param>
        /// <returns>List of comments if id existed</returns>
        /// <exception cref="CommentNotFoundException">if the id was not found</exception>
        public List<Comment> GetCommentsByMovieId(int movieId)
        {
            var commentList = _efService.GetCommentsByMovieId(movieId);
            if (commentList.Count != 0) return commentList.ToList();
            throw new CommentNotFoundException("movieId", movieId);
        }
        /// <summary>
        /// method to update a comment, apply controls and redirects to database layer
        /// </summary>
        /// <param name="commentId">id to use for search</param>
        /// <param name="commentText">new text to update</param>
        /// <returns>updated comment if id existed</returns>
        /// <exception cref="CommentNotFoundException">if the id was not found</exception>
        /// <exception cref="InvalidCommentTextLenghtException">if the text dose not respect Min Max lenght</exception>
        public Comment UpdateComment(int commentId, string commentText)
        {
            if (commentText.Length is > Comment.MIN_COMMENT_SIZE or < Comment.MIN_COMMENT_SIZE)
            {
                var comment = _efService.UpdateComment(commentId, commentText);
                if (comment != null) return comment;
                throw new CommentNotFoundException("id", commentId);
            }
            throw new InvalidCommentTextLenghtException(commentText.Length);
        }
        /// <summary>
        /// Method to delete a comment, apply controls and redirects to database layer
        /// </summary>
        /// <param name="commentId"> id to delete</param>
        /// <returns>ture if the id existed</returns>
        /// <exception cref="CommentNotFoundException"> if the id was not exist</exception>
        public bool DeleteComment(int commentId)
        {
            if (_efService.GetCommentById(commentId) != null)
            {
                return _efService.DeleteComment(commentId);
            }
            throw new CommentNotFoundException("id",commentId);

        }
    }
}