using System.ComponentModel.DataAnnotations;

namespace Employee.API.Model
{
    public class EmployeeViewModel
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeEmail { get; set; }
        public string EmployeePhone { get; set; }
        public string EmployeeDesignation { get; set; }
        public EmployeeAddressModel EmployeeAddress { get; set; }
    }
}
