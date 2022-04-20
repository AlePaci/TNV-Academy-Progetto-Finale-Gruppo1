using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace Comments.RestApi.Model.Responses
{
    /// <summary>
    /// Encapsulation of properties to send client side an error with a timestamp
    /// </summary>
    public class ErrorResponse
    {
        [JsonPropertyName("errorMessage")]
        public string ErrorMessage { get; set; }
        [JsonPropertyName("timeStamp")]
        public DateTime TimeStamp { get; set; }
    }
}

