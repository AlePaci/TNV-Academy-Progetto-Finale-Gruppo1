using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Comments.Db.Entities
{
    /// <summary>
    /// Encapsulation of properties for a comment object and decoration for translation in sql table
    /// </summary>
    [Table("comments")]
    public class CommentEntity
    {
        [Column("id"),Key]
        public int Id { get; set; }
        [Column("user_id"),Required]
        public int UserId { get; set; }
        [Column("movie_id"),Required,]
        public int MovieId { get; set; }
        [Column("comment"),Required,StringLength(150),DataType(DataType.Text)]
        public string CommentText { get; set; }
    }
    
}