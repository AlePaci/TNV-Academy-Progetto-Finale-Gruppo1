using System;
using Comments.Db.Entities;
using Microsoft.EntityFrameworkCore;

namespace Comments.Db 
{
    public class CommentsAppContext : DbContext
    {
        public DbSet<CommentEntity> Comments { get; set; }
        /// <summary>
        /// Method to configure the connection with the dataBase 
        /// </summary>
        /// <param name="optionsBuilder"></param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "Server=localhost;Port=3306;Database=CommentApi;Uid=root;Pwd=";
            var mySqlServerVersion = new MariaDbServerVersion(new Version(10, 4, 22));

            optionsBuilder.UseMySql(connectionString, mySqlServerVersion);
            base.OnConfiguring(optionsBuilder);
        }
    }
}
