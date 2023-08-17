using Microsoft.AspNetCore.Mvc.Filters;

namespace Employee.API.Utilities
{
    public class GlobalExceptionFilter : IExceptionFilter
    {
        private ILogger _logger;
        public GlobalExceptionFilter(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<GlobalExceptionFilter>();
        }
        void IExceptionFilter.OnException(ExceptionContext context)
        {
            _logger.LogError(context.Exception.Message, context.Exception.StackTrace);
        }
    }
}
