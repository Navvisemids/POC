using System.Net;
using System.Text;
using Employee.API.Business;
using Employee.API.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace Employee.Test
{
    [TestClass]
    public class EmployeeTest
    {
        private static TestContext _testContext = null;
        [ClassInitialize]
        public static void ClassInit(TestContext testContext)
        {
            _testContext = testContext;
        }

        [TestMethod]
        public async Task GetAllEmployees_SuccessResponse()
        {
            Console.WriteLine(_testContext.TestName);

            await using var factory = new WebApplicationFactory<Program>().WithWebHostBuilder(
                builder =>
                {
                    builder.UseSetting("https_port", "5001").UseEnvironment("Testing");
                    builder.ConfigureServices(services =>
                    {
                        services.AddScoped<IEmployeeBusiness, MockEmployee>();
                    });
                });

            using var client = factory.CreateClient();
            var response = await client.GetAsync("api/Employee/GetAllEmployees");

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var result = response.Content.ReadAsStringAsync().Result;
            var resultData = JsonConvert.DeserializeObject<List<EmployeeModel>>(result);
            Assert.AreEqual(1, resultData[0].EmployeeId);
            Assert.AreEqual("Sreepadha", resultData[0].EmployeeName);
        }

        [TestMethod]
        public async Task AddEmployee_SuccessResponse()
        {
            Console.WriteLine(_testContext.TestName);

            await using var factory = new WebApplicationFactory<Program>().WithWebHostBuilder(
                builder =>
                {
                    builder.UseSetting("https_port", "5001").UseEnvironment("Testing");
                    builder.ConfigureServices(services =>
                    {
                        services.AddScoped<IEmployeeBusiness, MockEmployee>();
                    });
                });

            using var client = factory.CreateClient();
            var mockEmp = new EmployeeModel
            {
                EmployeeId = 1,
                    EmployeeName = "Sreepadha",
                    EmployeeEmail = "sree@sree.com",
                    EmployeePhone = "9916633988",
                    EmployeeDesignation = "SSE"
            };
            string json = JsonConvert.SerializeObject(mockEmp, Formatting.Indented);
            var httpContent = new StringContent(json);
            var response = await client.PostAsync("api/Employee/AddEmployee", httpContent);

            //Assert.IsNotNull(HttpStatusCode.OK, response.StatusCode);
            Console.WriteLine(response);
            var result = await response.Content.ReadAsStringAsync();
            Assert.IsNotNull(result);
        }
    }
    public class MockEmployee : IEmployeeBusiness
    {
        Task<int> IEmployeeBusiness.AddEmployee(EmployeeModel employee)
        {
            return Task.FromResult(200);
        }

        Task<int> IEmployeeBusiness.DeleteEmployee(int employee_id)
        {
            return Task.FromResult(200);
        }

        public Task<List<EmployeeModel>> GetEmployees()
        {
            var mockEmp = new List<EmployeeModel>
            {
                new EmployeeModel
                {
                    EmployeeId = 1,
                    EmployeeName = "Sreepadha",
                    EmployeeEmail = "sree@sree.com",
                    EmployeePhone = "9916633988",
                    EmployeeDesignation = "SSE"
                }
            };
            return Task.FromResult(mockEmp);
        }

        Task<int> IEmployeeBusiness.UpdateEmployee(EmployeeModel employee)
        {
            return Task.FromResult(200);
        }
    }
}