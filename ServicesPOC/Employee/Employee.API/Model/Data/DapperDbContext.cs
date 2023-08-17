using System.Data;
using Microsoft.Data.SqlClient;

namespace Employee.API.Model.Data
{
    public class DapperDbContext
    {
        private readonly IConfiguration _configuration;
        private readonly string? connectionString;
        public DapperDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("sqlConnection");
        }

        public IDbConnection CreateConnection() => new SqlConnection(connectionString);
    }
}