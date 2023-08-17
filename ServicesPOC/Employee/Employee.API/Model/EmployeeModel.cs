using System.ComponentModel.DataAnnotations;

namespace Employee.API.Model
{
    public class EmployeeModel
    {
        [Required]
        public int EmployeeId { get; set; }
        [Required] 
        public string EmployeeName { get; set; }
        [Required]
        [EmailAddress]
        public string EmployeeEmail { get; set; }
        [Required]
        [RegularExpression("^([0-9]{10})$", ErrorMessage = "Invalid Mobile Number.")]
        public string EmployeePhone { get; set; }
        [Required] 
        public string EmployeeDesignation { get; set; }   
    }
}