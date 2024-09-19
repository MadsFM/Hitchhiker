using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class MadeGalaxyIdNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
                           WHERE constraint_name = 'FK_Planets_Galaxies_GalaxyId') THEN
                    ALTER TABLE ""Planets"" DROP CONSTRAINT ""FK_Planets_Galaxies_GalaxyId"";
                END IF;
            END
            $$;
        ");

            migrationBuilder.AlterColumn<int>(
                name: "GalaxyId",
                table: "Planets",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

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

            migrationBuilder.AlterColumn<int>(
                name: "GalaxyId",
                table: "Planets",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Planets_Galaxies_GalaxyId",
                table: "Planets",
                column: "GalaxyId",
                principalTable: "Galaxies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
