using System;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TasksAPI.Models;
using TasksAPI.Services;

[ApiController]
[Route("[controller]")]
public class TaskController : ControllerBase
{


    private readonly ITaskCollectionService _taskCollectionService;

    public TaskController(ITaskCollectionService taskCollectionService)
    {
        _taskCollectionService = taskCollectionService ?? throw new ArgumentNullException(nameof(TaskCollectionService));
    }

    

    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] TaskModel taskModel)
    {
        if (taskModel == null)
        {
            return BadRequest("Task cannot be null");
        }

        // to implement create task 
        await _taskCollectionService.Create(taskModel);
        return Ok(taskModel.Id);
    }
   

    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        List<TaskModel> tasks = await _taskCollectionService.GetAll();
        return Ok(tasks);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(Guid id)
    {
        try
        {
            var taskToDelete = await _taskCollectionService.GetAll();
            if (taskToDelete == null)
            {
                return NotFound("Task not found");
            }

            await _taskCollectionService.Delete(id);
            return Ok("Task deleted successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error in processing the task");
        }
    }


    //[HttpGet("Tasks")]
    //public IActionResult GetTasks()
    //{
    //    return Ok(_tasks);
    //}

    //[HttpPost("Task")]
    //public IActionResult CreateTask([FromBody] TaskModel task)
    //{
    //    if (task == null)
    //    {
    //        return BadRequest("Task cannot be null");

    //    }

    //    task.Id = Guid.NewGuid();
    //    _tasks.Add(task);
    //    return Ok(_tasks);
    //}

    //[httpput("updatetask")]
    //public iactionresult updatetask(guid id, [frombody] taskmodel updatedtask)
    //{
    //    if(updatedtask==null)
    //    { return badrequest("task was empty"); }

    //    taskmodel existingtask = _tasks.firstordefault(t => t.id == id);

    //    if(updatedtask.id!=existingtask.id)
    //    {
    //        return badrequest("task id in the body must match the route parameter id");
    //    }

    //    if (existingtask == null) { return notfound(id); }

    //    existingtask.title= updatedtask.title;
    //    existingtask.description=updatedtask.description;
    //    existingtask.assignedto = updatedtask.assignedto;
    //    existingtask.status = updatedtask.status;

    //    return ok(existingtask);
    //}

    //[HttpDelete("Task/{id}")]
    //public IActionResult DeleteTask(Guid id)
    //{
    //    try
    //    {
    //        TaskModel taskToDelete = _tasks.FirstOrDefault(t => t.Id == id);

    //        if (taskToDelete == null)
    //        {
    //            return NotFound("Task not found");
    //        }

    //        _tasks.Remove(taskToDelete);
    //        return Ok("Task deleted successfully");
    //    }
    //    catch (Exception ex)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError, "Error in processing the Task");
    //    }
    //}
}