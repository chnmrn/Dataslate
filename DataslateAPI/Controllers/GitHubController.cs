﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DataslateAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GitHubController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public GitHubController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("issues/{owner}/{repo}")]
        public async Task<IActionResult> GetIssues(string owner, string repo)
        {
            var client = _httpClientFactory.CreateClient("GitHub");
            var response = await client.GetAsync($"/repos/{owner}/{repo}/issues");
            if (!response.IsSuccessStatusCode) 
            {
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }
               
            var commits = await response.Content.ReadFromJsonAsync<List<object>>();
            return Ok(commits);

        }

        [HttpGet("commits/{owner}/{repo}")]
        public async Task<IActionResult> GetCommits(string owner, string repo)
        {
            var client = _httpClientFactory.CreateClient("GitHub");
            var response = await client.GetAsync($"/repos/{owner}/{repo}/commits");
            if (!response.IsSuccessStatusCode) 
            {
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }
               
            var issues = await response.Content.ReadFromJsonAsync<List<object>>();
            return Ok(issues);
        }

        [HttpGet("collaborators/{owner}/{repo}")]
        public async Task<IActionResult> GetCollaborators(string owner, string repo)
        {
            var client = _httpClientFactory.CreateClient("GitHub");
            var response = await client.GetAsync($"/repos/{owner}/{repo}/collaborators");
            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());

            var data = await response.Content.ReadFromJsonAsync<List<object>>();
            return Ok(data);
        }
    }
}