using System;

namespace Comments.Core.Exceptions
{
    
    /// <summary>
    /// Exception used if dataBase is empty
    /// </summary>
    public class DataBaseEmptyException : Exception
    {
        public DataBaseEmptyException() : base("The DataBase is empty.")
        {
            
        }
    }
}
