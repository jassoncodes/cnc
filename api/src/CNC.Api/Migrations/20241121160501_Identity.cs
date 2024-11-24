using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CNC.Api.Migrations
{
    /// <inheritdoc />
    public partial class Identity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "identity");

            migrationBuilder.CreateTable(
                name: "cnc_pacientes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    expediente = table.Column<string>(type: "text", nullable: true),
                    cedula = table.Column<string>(type: "text", nullable: true),
                    nombre = table.Column<string>(type: "text", nullable: true),
                    apellido = table.Column<string>(type: "text", nullable: true),
                    sexo = table.Column<string>(type: "text", nullable: true),
                    fechaNacimiento = table.Column<string>(type: "text", nullable: true),
                    estadoCivil = table.Column<string>(type: "text", nullable: true),
                    nivelAcademico = table.Column<string>(type: "text", nullable: true),
                    religion = table.Column<string>(type: "text", nullable: true),
                    tutorCuidador = table.Column<string>(type: "text", nullable: true),
                    telefono = table.Column<string>(type: "text", nullable: true),
                    celular = table.Column<string>(type: "text", nullable: true),
                    telefonoTrabajo = table.Column<string>(type: "text", nullable: true),
                    direccion = table.Column<string>(type: "text", nullable: true),
                    motivoConsulta = table.Column<string>(type: "text", nullable: true),
                    correoElectronico = table.Column<string>(type: "text", nullable: true),
                    medioContacto = table.Column<string>(type: "text", nullable: true),
                    fechaPrimeraConsulta = table.Column<string>(type: "text", nullable: true),
                    numeroAfiliadoARS = table.Column<string>(type: "text", nullable: true),
                    contratoNss = table.Column<string>(type: "text", nullable: true),
                    observacion = table.Column<string>(type: "text", nullable: true),
                    esado = table.Column<string>(type: "text", nullable: true),
                    fechaCreacion = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    fechaActualizacion = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cnc_pacientes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "cnc_roles",
                schema: "identity",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cnc_roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "cnc_users",
                schema: "identity",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cnc_users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "cnc_role_claims",
                schema: "identity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cnc_role_claims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_cnc_role_claims_cnc_roles_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "identity",
                        principalTable: "cnc_roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "cnc_user_claims",
                schema: "identity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cnc_user_claims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_cnc_user_claims_cnc_users_UserId",
                        column: x => x.UserId,
                        principalSchema: "identity",
                        principalTable: "cnc_users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "cnc_user_logins",
                schema: "identity",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cnc_user_logins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_cnc_user_logins_cnc_users_UserId",
                        column: x => x.UserId,
                        principalSchema: "identity",
                        principalTable: "cnc_users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "cnc_user_roles",
                schema: "identity",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cnc_user_roles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_cnc_user_roles_cnc_roles_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "identity",
                        principalTable: "cnc_roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_cnc_user_roles_cnc_users_UserId",
                        column: x => x.UserId,
                        principalSchema: "identity",
                        principalTable: "cnc_users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "cnc_user_tokens",
                schema: "identity",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cnc_user_tokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_cnc_user_tokens_cnc_users_UserId",
                        column: x => x.UserId,
                        principalSchema: "identity",
                        principalTable: "cnc_users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                schema: "identity",
                table: "cnc_roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b043e585-b8be-4f35-9034-e31fcee6071c", null, "Admin", "ADMIN" },
                    { "c1b733f4-68c9-48e6-8909-e881ba70d86e", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_cnc_role_claims_RoleId",
                schema: "identity",
                table: "cnc_role_claims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                schema: "identity",
                table: "cnc_roles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_cnc_user_claims_UserId",
                schema: "identity",
                table: "cnc_user_claims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_cnc_user_logins_UserId",
                schema: "identity",
                table: "cnc_user_logins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_cnc_user_roles_RoleId",
                schema: "identity",
                table: "cnc_user_roles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                schema: "identity",
                table: "cnc_users",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                schema: "identity",
                table: "cnc_users",
                column: "NormalizedUserName",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "cnc_pacientes");

            migrationBuilder.DropTable(
                name: "cnc_role_claims",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "cnc_user_claims",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "cnc_user_logins",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "cnc_user_roles",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "cnc_user_tokens",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "cnc_roles",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "cnc_users",
                schema: "identity");
        }
    }
}
