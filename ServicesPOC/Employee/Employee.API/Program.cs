using Employee.API.Business;
using Employee.API.Model.Data;
using Employee.API.Repo;
using Employee.API.Services;
using Employee.API.Utilities;
using NLog;
using NLog.Web;

var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("init main");

var builder = WebApplication.CreateBuilder(args);
//Logging
builder.Logging.ClearProviders();
builder.WebHost.UseNLog();

// Add services to the container.
builder.Services.AddControllersWithViews(options =>
{
    options.Filters.Add<GlobalExceptionFilter>();
});

// Db connection.
builder.Services.AddSingleton<DapperDbContext>();
builder.Services.AddScoped<IDapperRepository,DapperRespository>();
//DI for Business
builder.Services.AddScoped<IEmployeeBusiness,EmployeeBusiness>();
//DI for Repository
builder.Services.AddScoped<IEmployeeRepo,EmployeeRepo>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program { }