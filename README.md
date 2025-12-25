# Dataslate

Dataslate is a small dashboard that integrates projects, tasks, and GitHub repositories into a single interface.
It allows users to manage projects and tasks, visualize metrics, check latest commits, and inspect repository collaborators.

## Installation
### 1. Clone the repository
```bash
git clone https://github.com/yourusername/dataslate.git
cd dataslate
```


### 2. Backend configuration (ASP.NET Core)
For this project you will need to provide tokens (JWT & GitHub).

They are provided to the backend, check the configuration.
Required variables:

```C#
GITHUB_TOKEN: yourGitHubToken  
JWT_KEY: yourJWTToken
```
These variables are consumed exclusively by the ASP.NET Core API.

### 3. Run the projects
Back End **(ASP.NET Core)**:
```bash 
dotnet run
```  
Front End **(Next.js)**: 
```bash 
npm install
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser --(optional)
npm run dev
```
  
The frontend communicates with the backend API and does not handle any sensitive credentials.

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
