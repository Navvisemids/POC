using Employee.API.Model;

namespace Employee.API.Business
{
    public interface IEmployeeBusiness
    {
        Task<List<EmployeeViewModel>> GetEmployees();
        Task<bool> AddEmployee(EmployeeModel employee);
        Task<bool> UpdateEmployee(EmployeeModel employee);
        Task<bool> DeleteEmployee(int employee_id);
        Task<bool> AddEmployeeAddress(List<EmployeeAddressModel> employeeAddresses);
    }
}