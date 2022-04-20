namespace Comments.RestApi.Model
{
    /// <summary>
    /// Encapsulation of properties of a comment that is send client side.
    /// </summary>
    public class CommentDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public string CommentText { get; set; }
    }
}

