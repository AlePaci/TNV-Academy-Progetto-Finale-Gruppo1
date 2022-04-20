using Comments.Core.Model;
using Comments.RestApi.Model;

namespace Comments.RestApi.Mappers
{
    
}
/// <summary>
/// Encapsulation of methods to convert object from the business layer to objects of the RestApi layer and vice versa.
/// </summary>
public static class CommentMapper
{
    /// <summary>
    /// Converts business layer object in restApi layer one.
    /// </summary>
    /// <param name="comment">Comment object form the business layer<see cref="Comment"/></param>
    /// <returns>CommentDTO object from the RestApi layer <see cref="CommentDTO"/></returns>
    public static CommentDTO From(Comment comment)
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
    /// Converts business layer object in restApi layer one.
    /// </summary>
    /// <param name="comment">CommentDTo object form the RestApi layer<see cref="CommentDTO"/></param>
    /// <returns>Comment object from the business layer <see cref="Comment"/></returns>
    public static Comment From(CommentDTO comment)
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