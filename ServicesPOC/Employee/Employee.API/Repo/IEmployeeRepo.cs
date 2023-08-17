
using Dapper;
using Employee.API.Model;

namespace Employee.API.Repo
{
    public interface IEmployeeRepo
    {
        Task<List<EmployeeViewModel>> GetEmployees();
        Task<bool> AddEmployee(DynamicParameters dp_params);
        Task<bool> UpdateEmployee(DynamicParameters dp_params);
        Task<bool> DeleteEmployee(DynamicParameters dp_params);
        Task<bool> AddEmployeeAddress(DynamicParameters dp_params);
    }
}