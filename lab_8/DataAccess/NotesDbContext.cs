﻿using MyNotes.Models;
using Microsoft.EntityFrameworkCore;
//using lab_8.Model;

namespace MyNotes.DataAccess;

public class NotesDbContext : DbContext
{
    private readonly IConfiguration _configuration;

    public NotesDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public DbSet<Note> Notes => Set<Note>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_configuration.GetConnectionString("Database"));
    }
}