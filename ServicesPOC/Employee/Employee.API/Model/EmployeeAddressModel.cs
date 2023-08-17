using System.ComponentModel.DataAnnotations;

namespace Employee.API.Model
{
    public class EmployeeAddressModel
    {
        [Required] 
        public int EmployeeDoorNo { get; set; }
        [Required] 
        public string EmployeeStreet1 { get; set; }
        [Required] 
        public string EmployeeStreet2 { get; set; }
        [Required] 
        public string EmployeeCity { get; set; }
        [Required] 
        public string EmployeeState { get; set; }
        [Required]
        [RegularExpression("^[1-9][0-9]{5}$", ErrorMessage = "Invalid Pincode.")]
        public string EmployeePincode { get; set; }
        [Required] 
        public int EmployeeId { get; set; }
    }
}
