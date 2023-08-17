using Employee.API.Business;
using Employee.API.Model;
using Microsoft.AspNetCore.Mvc;

namespace Employee.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeBusiness _employeeBusiness;

        public EmployeeController(IEmployeeBusiness employeeBusiness, ILogger<EmployeeController> logger)
        {
            _employeeBusiness = employeeBusiness;
        }

        [HttpGet("GetAllEmployees")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var _list = await _employeeBusiness.GetEmployees();
            if (_list != null)
            {
                return Ok(_list);
            }
            else
            {
                return NotFound();
            }

        }
        [HttpPost("AddEmployee")]
        public async Task<IActionResult> AddEmployee(EmployeeModel employee)
        {
            if(ModelState.IsValid) { 
                var status = await _employeeBusiness.AddEmployee(employee);
                return status ? Ok("Inserted Successfully") : BadRequest("Failed to insert into database");
            }
            return BadRequest("Invalid Request");
        }

        [HttpPut("UpdateEmployee")]
        public async Task<IActionResult> UpdateEmployee(EmployeeModel employee)
        {
            if (ModelState.IsValid)
            {
                var status = await _employeeBusiness.UpdateEmployee(employee);
                return status ? Ok("Updated Successfully") : BadRequest("Failed to update into database");
            }
            return BadRequest("Invalid Request");
        }
        [HttpDelete("DeleteEmployee")]
        public async Task<IActionResult> DeleteEmployee(int employee_id)
        {
            if (ModelState.IsValid)
            {
                var status = await _employeeBusiness.DeleteEmployee(employee_id);
                return status ? Ok("Deleted Successfully") : BadRequest("Failed to delete from database");
            }
            return BadRequest("Invalid Request");
        }
        [HttpPost("AddEmployeeAddress")]
        public async Task<IActionResult> AddEmployeeAddress(List<EmployeeAddressModel> empployeeAddress)
        {
            if (ModelState.IsValid)
            {
                var status = await _employeeBusiness.AddEmployeeAddress(empployeeAddress);
                return status ? Ok("Inserted Successfully") : BadRequest("Failed to insert into database");
            }
            return BadRequest("Invalid Request");
        }
    }
}