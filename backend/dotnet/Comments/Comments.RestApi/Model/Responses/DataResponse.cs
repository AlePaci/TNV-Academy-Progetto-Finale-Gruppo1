using System.Text.Json.Serialization;

namespace Comments.RestApi.Model.Responses
{
    /// <summary>
    /// Encapsulation of properties to send client side a Comment with the timestamp
    /// </summary>
    public class DataResponse
    {
        [JsonPropertyName("data")]
        public CommentDTO Data { get; set; }
        [JsonPropertyName("timeStamp")]
        public DateTime TimeStamp { get; set; }
    }
}
