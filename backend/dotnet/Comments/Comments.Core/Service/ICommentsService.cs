using Comments.Core.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace Comments.Core.Service
{
    
    /// <summary>
    /// Interface that define all the methods to use for a CRUD REST application
    /// </summary>
    public interface ICommentsStorage
    {
        Comment CreateComment(int userId,int movieId,string commentText);
        
        List<Comment> GetAllComments();

        Comment? GetCommentById(int commentId);

        List<Comment> GetCommentsByUserId(int userId);

        List<Comment> GetCommentsByMovieId(int movieId);

        Comment? GetCommentByMovieIdUserId(int movieId,int userId);

        Comment? UpdateComment(int commentId, string updatedCommentProp);

        Task DeleteComment(int commentId);
    }
}