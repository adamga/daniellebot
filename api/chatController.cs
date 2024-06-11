using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DanielleBot.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ChatRequest request)
        {
            // Simulate processing the chat request and generating a response
            // In a real application, this would involve more complex logic
            // including possibly querying a database or integrating with AI services
            var response = new ChatResponse
            {
                Response = $"Received message: {request.Message}. This is a simulated response."
            };

            return Ok(response);
        }
    }

    public class ChatRequest
    {
        public string Message { get; set; }
    }

    public class ChatResponse
    {
        public string Response { get; set; }
    }
}
