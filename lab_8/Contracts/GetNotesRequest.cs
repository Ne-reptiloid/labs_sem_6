using Microsoft.Data.SqlClient;

namespace MyNotes.Contracts;
public record GetNotesRequest(string? Search, string? SortItem, string? SortOrder);

