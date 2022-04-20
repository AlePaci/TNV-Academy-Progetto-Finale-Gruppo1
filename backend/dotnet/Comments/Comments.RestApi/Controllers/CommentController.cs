using Comments.Core.Exceptions;
using Comments.Core.Service.Impl;
using Comments.RestApi.Model;
using Comments.RestApi.Model.Request;
using Comments.RestApi.Model.Responses;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
namespace Comments.RestApi.Controllers
{
    /// <summary>
    /// Encapsulation of methods to show e receive data from the client side.
    /// </summary
    [ApiController]
    [EnableCors("Policy")]
    [Route("comment")]
    public class CommentController : ControllerBase
    {
        private CommentsCoreService _coreService;

        public CommentController(CommentsCoreService commentsCoreService)
        {
            _coreService = commentsCoreService;
        }

        /// <summary>
        /// Method to Create and save new comment, gets the request from client side and redirects to the business layer
        /// </summary>
        /// <param name="parameters">all the data needed to save new comment</param>
        /// <returns>200 http response with new comment data and timestamp</returns>
        /// <exception cref="InvalidCommentTextLenghtException"></exception>
        /// <returns>400 http response with message and timestamp</returns>
        [HttpPost]
        public ActionResult<CommentDTO> CreateComment([FromBody] CommentParameters parameters)
        {
            try
            {
                var comment = _coreService.CreateComment(parameters.UserId, parameters.MovieId, parameters.CommentText);
                return Ok(new DataResponse()
                {
                    Data = CommentMapper.From(comment),
                    TimeStamp = DateTime.Now
                });
            }
            catch (InvalidCommentTextLenghtException ex)
            {
                return BadRequest(new ErrorResponse()
                {
                    ErrorMessage = ex.Message,
                    TimeStamp = DateTime.Now
                });
            }

        }
        /// <summary>
        /// Method to get all comments, gets the request from client side and redirects to the business layer
        /// </summary>
        /// <returns>200 http response with list of comments data and timestamp</returns>
        /// <exception cref="DataBaseEmptyException"></exception>
        /// <returns>404 http response whit message and timestamp</returns>
        [HttpGet]
        public ActionResult<List<CommentDTO>> GetAllComments()
        {
            try
            {
                var commentList = _coreService.GetAllComments();
                return Ok(new ListDataResponse()
                {
                    Data = commentList.Select(c => CommentMapper.From(c)).ToList(),
                    TimeStamp = DateTime.Now
                });
            }
            catch (DataBaseEmptyException ex)
            {
                return NotFound(new MessageResponse()
                {
                    Message = ex.Message,
                    TimeStamp = DateTime.Now
                });
            }
            
        }
        /// <summary>
        /// Method to search for comment by id, gets the request from client side and redirects to the business layer
        /// </summary>
        /// <param name="commentId">id used in search</param>
        /// <returns>200 http response with comment data and timestamp</returns>
        /// <exception cref="CommentNotFoundException"></exception>
        /// <returns>404 http response whit message and timestamp</returns>
        [HttpGet]
        [Route("byid/{comment-id}")]
        public ActionResult<CommentDTO> GetCommentById([FromRoute(Name = "comment-id")] int commentId)
        {
            try
            {
                var comment = _coreService.GetCommentById(commentId);
                return Ok(new DataResponse()
                {
                    Data = CommentMapper.From(comment),
                    TimeStamp = DateTime.Now
                });
            }
            catch (CommentNotFoundException ex)
            {
                return NotFound(new ErrorResponse()
                {
                    ErrorMessage = ex.Message,
                    TimeStamp = DateTime.Now
                });
            }
        }
        /// <summary>
        /// Method to search for comments by user id, gets the request from client side and redirects to the business layer
        /// </summary>
        /// <param name="userId">user id used in search</param>
        /// <returns>200 http response with list of comments data and timestamp</returns>
        /// <exception cref="CommentNotFoundException"></exception>
        /// <returns>404 http response whit message and timestamp</returns>
        [HttpGet]
        [Route("byuser/{user-id}")]
        public ActionResult<List<CommentDTO>> GetCommentByUserId([FromRoute(Name = "user-id")] int userId)
        {
            try
            {
                var commentList = _coreService.GetCommentsByUserId(userId);
                return Ok(new ListDataResponse()
                {
                    Data = commentList.Select(c => CommentMapper.From(c)).ToList(),
                    TimeStamp = DateTime.Now
                });
            }
            catch (CommentNotFoundException ex)
            {
                return NotFound(new ErrorResponse()
                {
                    ErrorMessage = ex.Message,
                    TimeStamp = DateTime.Now
                });
            }
        }
        /// <summary>
        ///Method to search for comments by movie id, gets the request from client side and redirects to the business layer
        /// </summary>
        /// <param name="movieId">movie id used in the search</param>
        /// <returns>200 http response with list of comments data and timestamp</returns>
        /// <exception cref="CommentNotFoundException"></exception>
        /// <returns>404 http response whit message and timestamp</returns>
        [HttpGet]
        [Route("bymovie/{movie-id}")]
        public ActionResult<List<CommentDTO>> GetCommentByMovieId([FromRoute(Name = "movie-id")] int movieId)
        {
            try
            {
                var commentList = _coreService.GetCommentsByMovieId(movieId);
                return Ok(new ListDataResponse()
                {
                    Data = commentList.Select(c => CommentMapper.From(c)).ToList(),
                    TimeStamp = DateTime.Now
                });
            }
            catch (CommentNotFoundException ex)
            {
                return NotFound(new ErrorResponse()
                {
                    ErrorMessage = ex.Message,
                    TimeStamp = DateTime.Now
                });
            }
        }
        /// <summary>
        /// Method to update a comment, gets the request from client side and redirects to the business layer
        /// </summary>
        /// <param name="commentId">id used in the search</param>
        /// <param name="parameters"> used in the update of the comment</param>
        /// <returns>200 http response with comment data and timestamp</returns>
        /// <exception cref="InvalidCommentTextLenghtException"></exception>
        /// <returns>400 http response with message and timestamp</returns>
        /// <exception cref="CommentNotFoundException"></exception>
        /// <returns>404 http response whit message and timestamp</returns>
        [HttpPut]
        [Route("update/{comment-id}")]
        public ActionResult<CommentDTO> UpdateComment([FromRoute(Name = "comment-id")] int commentId,
            [FromBody] CommentParameters parameters)
        {
            try
            {
                var comment = _coreService.UpdateComment(commentId, parameters.CommentText);
                return Ok(new DataResponse()
                {
                    Data = CommentMapper.From(comment),
                    TimeStamp = DateTime.Now
                });
            }
            catch (InvalidCommentTextLenghtException ex)
            {
                return BadRequest(new ErrorResponse()
                {
                    ErrorMessage = ex.Message,
                    TimeStamp = DateTime.Now
                });
            }
            catch (CommentNotFoundException ex)
            {
                return NotFound(new ErrorResponse()
                {
                    ErrorMessage = ex.Message,
                    TimeStamp = DateTime.Now
                });
            }
        }
        
        /// <summary>
        /// Method to Delete a comment, gets the request from client side and redirects to the business layer
        /// </summary>
        /// <param name="commentId"> id used in the search and delete</param>
        /// <returns>A 200 or 404 http respons whith message and timstamp </returns>
        /// <exception cref="CommentNotFoundException"></exception>
        [HttpDelete]
        [Route("delete/{comment-id}")]
        public ActionResult<MessageResponse> DeleteComment([FromRoute(Name = "comment-id")]int commentId)
        {
            try
            {
                var outPut = _coreService.DeleteComment(commentId);
                return Ok(new MessageResponse()
                    {
                        Message = $"Comment whith id {commentId} deleted",
                        TimeStamp = DateTime.Now
                    });
            }
            catch (CommentNotFoundException ex)
            {
                return NotFound(new ErrorResponse()
                {
                    ErrorMessage = ex.Message,
                    TimeStamp = DateTime.Now
                });
            }
        }
        
        
    }
}
