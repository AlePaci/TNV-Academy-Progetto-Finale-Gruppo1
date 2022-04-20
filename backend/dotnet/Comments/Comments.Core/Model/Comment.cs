using System;
namespace Comments.Core.Model
{
    /// <summary>
    /// Encapsulation of properties for Comment Objects
    /// </summary>
    public class Comment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public string CommentText { get; set; }

        public const int MIN_COMMENT_SIZE = 10;

        public const int MAX_COMMENT_SIZE = 150;
        
        
    }
}
