using System.Data;
using Dapper;
using Employee.API.Model;
using Employee.API.Model.Data;
using Employee.API.Services;

namespace Employee.API.Repo
{
    public class EmployeeRepo : IEmployeeRepo
    {
        private readonly IDapperRepository _dapperRepository;
        public EmployeeRepo(IDapperRepository dapperRepository)
        {
            _dapperRepository = dapperRepository;
        }
        public async Task<List<EmployeeViewModel>> GetEmployees()
        {
            return await _dapperRepository.GetAll<EmployeeViewModel>("dbo.sp_GetAllEmployees", null);
        }

        public async Task<bool> AddEmployee(DynamicParameters dp_params)
        {
            return await _dapperRepository.Execute_sp<int>("dbo.sp_AddEmployee",dp_params,commandType:CommandType.StoredProcedure) > 0;
        }
        public async Task<bool> UpdateEmployee(DynamicParameters dp_params)
        {
            return await _dapperRepository.Execute_sp<int>("dbo.sp_UpdateEmployee",dp_params,commandType:CommandType.StoredProcedure) > 0;
        }
        public async Task<bool> DeleteEmployee(DynamicParameters dp_params)
        {
            return await _dapperRepository.Execute_sp<int>("dbo.sp_DeleteEmployee", dp_params, commandType: CommandType.StoredProcedure) > 0;
        }
        public async Task<bool> AddEmployeeAddress(DynamicParameters dp_params)
        {
            return await _dapperRepository.Execute_sp<int>("dbo.sp_AddEmployeeAddress", dp_params, commandType: CommandType.StoredProcedure) > 0;
        }
    }
}