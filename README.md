# Dataslate

Dataslate is a small dashboard that integrates projects, tasks, and GitHub repositories into a single interface.
It allows users to **manage personal projects and tasks, visualize progress metrics**, and **inspect GitHub repository activity (commits and collaborators)** - 
without making any changes to the repositories, avoiding unintended modifications or confusion.

## Installation
### 1. Clone the repository

```bash
git clone https://github.com/chnmrn/dataslate.git
cd dataslate
```

### 2. Backend configuration (ASP.NET Core)
For this project you will need to provide tokens (JWT & GitHub).

They are provided to the backend, check the appsettings.json, there you will find the following code:

```C#
{
  "GitHub": {
    "Token": "your_github_token_here"
  },
  "Jwt": {
    "Key": "your_jwt_secret"
  }
}
```
These variables are consumed exclusively by the ASP.NET Core API.

Create a token in GitHub and insert it in the project.  
For the GitHub Token, be sure to select **ONLY** the options: `repo`, `read:user` and `read:org`  
Try to **avoid** using `write:repo` or `delete;repo` 

**IMPORTANT:** If no GitHub token is provided, GitHub-related features will be disabled by design.

### 3. Run the projects
Back End **(ASP.NET Core)**:
```bash 
dotnet run
```  
Front End **(Next.js)**: 
```bash
cd dataslatefront-end
npm install
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser #(For powershell - Optional)
npm run dev
```

The frontend communicates with the backend API and does not handle any sensitive credentials.  
You need to do `npm install` in order to download Next.js for the project

## Backend (ASP.NET Core)

- REST API secured with JWT authentication.
- Entity Framework Core for data access

## Frontend (Next.js + Tailwind CSS)

- Quick creation of projects and tasks
- Overview of project and task statistics
- Interactive project list
- Recent commits from the selected repository
- Repository collaborators overview
- Task progress tracking

## Authentication

- Email/password authentication
- Passwords hashed using BCrypt
- JWT tokens with 2-hour expiration

## Tech Stack

***Frontend:*** Next.js, React, Tailwind CSS.  
***Backend:*** ASP.NET Core, Entity Framework Core.  
***Database:*** SQL Server / MySQL.  
***Authentication:*** JWT, BCrypt, Integrations, GitHub REST API

## License
MIT License © 2025 Juan

