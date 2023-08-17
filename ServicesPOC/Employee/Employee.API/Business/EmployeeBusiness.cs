using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Dapper;
using Employee.API.Model;
using Employee.API.Repo;
using Employee.API.Utilities;

namespace Employee.API.Business
{
    public class EmployeeBusiness : IEmployeeBusiness
    {
        private readonly IEmployeeRepo _employeeRepo;

        public EmployeeBusiness(IEmployeeRepo employeeRepo)
        {
            _employeeRepo = employeeRepo;
        }
        public async Task<List<EmployeeViewModel>> GetEmployees()
        {
            return await _employeeRepo.GetEmployees();
        }
        public async Task<bool> AddEmployee(EmployeeModel employee)
        {
            var dp_params = new DynamicParameters();
            dp_params.Add("employee_name",employee.EmployeeName);
            dp_params.Add("employee_email",employee.EmployeeEmail);
            dp_params.Add("employee_phone",employee.EmployeePhone);
            dp_params.Add("employee_designation",employee.EmployeeDesignation);
            
            return await _employeeRepo.AddEmployee(dp_params);
        }
        public async Task<bool> UpdateEmployee(EmployeeModel employee)
        {
            var dp_params = new DynamicParameters();
            dp_params.Add("employee_id",employee.EmployeeId);
            dp_params.Add("employee_name",employee.EmployeeName);
            dp_params.Add("employee_email",employee.EmployeeEmail);
            dp_params.Add("employee_phone",employee.EmployeePhone);
            dp_params.Add("employee_designation",employee.EmployeeDesignation);
            
            return await _employeeRepo.UpdateEmployee(dp_params);
        }
        public async Task<bool> DeleteEmployee(int employee_id)
        {
            var dp_params = new DynamicParameters();
            dp_params.Add("employee_id",employee_id);
            
            return await _employeeRepo.DeleteEmployee(dp_params);
        }

        public async Task<bool> AddEmployeeAddress(List<EmployeeAddressModel> employeeAddresses)
        {
            //var tvpExampleType = new List<EmployeeAddressModel>();
            //tvpExampleType.Add(new EmployeeAddressModel { EmployeeAddressId = 1, EmployeeDoorNo = "107",
            //EmployeeStreet1="Test", EmployeeStreet2="Test2", EmployeeCity = "Bangalore", EmployeeState="Karnataka",
            //EmployeePincode="560026", EmployeeId = 1});
            //tvpExampleType.Add(new EmployeeAddressModel { ID = 2, Name = "Steve" });
            DataTable selloutTable = employeeAddresses.ConvertToDataTable<EmployeeAddressModel>();

            var dp_params = new DynamicParameters();
            dp_params.Add("tbEmployeeAddress", selloutTable.AsTableValuedParameter("dbo.tbEmployeeAddress"));
            return await _employeeRepo.AddEmployeeAddress(dp_params);
        }
    }
}