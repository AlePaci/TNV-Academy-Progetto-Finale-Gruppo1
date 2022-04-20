using System.Text.Json.Serialization;

namespace Comments.RestApi.Model.Request
{
    /// <summary>
    /// Encapsulation of properties used to receive form client side an object in json format.
    /// </summary>
    public class CommentParameters
    {
        [JsonPropertyName("userId")]
        public int UserId { get; set; }
        [JsonPropertyName("movieId")]
        public int MovieId { get; set; }
        [JsonPropertyName("commentText")]
        public string CommentText { get; set; }
    }
}

