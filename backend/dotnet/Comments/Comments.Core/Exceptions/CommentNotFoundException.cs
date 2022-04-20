using System;

namespace Comments.Core.Exceptions
{
   /// <summary>
   /// Exception used if no comment data is found
   /// </summary>
   public class CommentNotFoundException : Exception
   {
      public CommentNotFoundException(string whoId, int id) :base($"Comment with {whoId}:{id} was not found.")
      {
         
      }
   } 
}
