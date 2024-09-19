using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class MadeANewTableForUniverse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GalaxyId",
                table: "Planets",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Galaxies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Galaxies", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Planets_GalaxyId",
                table: "Planets",
                column: "GalaxyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Planets_Galaxies_GalaxyId",
                table: "Planets",
                column: "GalaxyId",
                principalTable: "Galaxies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Planets_Galaxies_GalaxyId",
                table: "Planets");

            migrationBuilder.DropTable(
                name: "Galaxies");

            migrationBuilder.DropIndex(
                name: "IX_Planets_GalaxyId",
                table: "Planets");

            migrationBuilder.DropColumn(
                name: "GalaxyId",
                table: "Planets");
        }
    }
}
