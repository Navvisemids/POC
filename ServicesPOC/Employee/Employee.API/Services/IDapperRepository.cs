using System.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace Employee.API.Services
{
    public interface IDapperRepository
    {
        Task<List<T>> GetAll<T>(string query, DynamicParameters? sp_params, CommandType commandType = CommandType.StoredProcedure);
        Task<int> Execute_sp<T>(string query, DynamicParameters sp_params, CommandType commandType = CommandType.StoredProcedure);
    }
}