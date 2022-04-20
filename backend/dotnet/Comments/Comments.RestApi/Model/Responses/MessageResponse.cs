using System.Text.Json.Serialization;

namespace Comments.RestApi.Model.Responses
{
    /// <summary>
    /// Encapsulation of properties to send client side a message with a timestamp
    /// </summary>
    public class MessageResponse
    {
        [JsonPropertyName("message")]
        public string Message { get; set; }
        [JsonPropertyName("timestamp")]
        public DateTime TimeStamp { get; set; }
    }
}
