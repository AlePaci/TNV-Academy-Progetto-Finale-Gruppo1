using System.Text.Json.Serialization;

namespace Comments.RestApi.Model.Responses
{
    /// <summary>
    /// Encapsulation of properties to send client side a List if Comment with the timestamp
    /// </summary>
    public class ListDataResponse
    {
        [JsonPropertyName("data")]
        public List<CommentDTO> Data { get; set; }
        [JsonPropertyName("timeStamp")]
        public DateTime TimeStamp { get; set; }
    }
}

