using lab04.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace lab04.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ShopContext _shopContext;
        public EmployeeController(ShopContext shopContext)
        {
            _shopContext = shopContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if (_shopContext.Brands == null)
            {
                return NotFound();
            }
            else
            {
                return await _shopContext.Employees.ToListAsync();
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            if (_shopContext.Employees == null)
            {
                return NotFound();
            }

            var employee = await _shopContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }
            else
            {
                return employee;
            }
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _shopContext.Employees.Add(employee);
            await _shopContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.ID }, employee);
        }


        [HttpPut]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.ID)
            {
                return BadRequest();
            }
            _shopContext.Entry(employee).State = EntityState.Modified;

            try
            {
                await _shopContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeAvailable(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }

            }
            return Ok();
        }

        private bool EmployeeAvailable(int id)
        {
            return (_shopContext.Employees?.Any(x => x.ID == id)).GetValueOrDefault();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            if (_shopContext.Employees == null)
            {
                return NotFound();
            }
            var employee = await _shopContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }
            _shopContext.Employees.Remove(employee);
            await _shopContext.SaveChangesAsync();
            return Ok();

        }


    }
}

