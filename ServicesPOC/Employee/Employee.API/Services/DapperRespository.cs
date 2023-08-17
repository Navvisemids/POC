using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Employee.API.Model.Data;

namespace Employee.API.Services
{
    public class DapperRespository : IDapperRepository
    {
        private readonly DapperDbContext _dapperDbContext;

        public DapperRespository(DapperDbContext dapperDbContext)
        {
            _dapperDbContext = dapperDbContext;
        }
        public async Task<List<T>> GetAll<T>(string query, DynamicParameters? sp_params, CommandType commandType = CommandType.StoredProcedure)
        {
            using(var connection = _dapperDbContext.CreateConnection())
            {
                return (List<T>)await connection.QueryAsync<T>(query,sp_params,commandType:commandType); 
            }
        }

        public async Task<int> Execute_sp<T>(string query, DynamicParameters sp_params, CommandType commandType)
        {
            int result = 0;
            using(var connection = _dapperDbContext.CreateConnection())
            {
                if(connection.State == ConnectionState.Closed)
                    connection.Open();
                using var transaction = connection.BeginTransaction();
                try
                {
                    result = await connection.ExecuteAsync(query,sp_params,commandType:commandType,transaction:transaction);
                    //result = sp_params.Get<T>("status_code");
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
            }
            return result;
        }
    }
}