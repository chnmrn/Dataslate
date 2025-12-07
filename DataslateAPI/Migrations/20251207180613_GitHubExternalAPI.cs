using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataslateAPI.Migrations
{
    /// <inheritdoc />
    public partial class GitHubExternalAPI : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GitHubIssueId",
                table: "TaskItems",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GitHubIssueId",
                table: "TaskItems");
        }
    }
}
