using System;
using Comments.Core.Model;

namespace Comments.Core.Exceptions
{
    /// <summary>
    /// Exception used if the text of a comment dose not respect the MIN MAX lenght
    /// </summary>
    public class InvalidCommentTextLenghtException : Exception
    {
        public InvalidCommentTextLenghtException(int lenght) :
            base($"Comment with lenght {lenght} not valid. Min:{Comment.MIN_COMMENT_SIZE} Max:{Comment.MAX_COMMENT_SIZE}")
        {
            
        }
        
    }
}
