using System.Linq.Expressions;
using CNC.Api.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace CNC.Api.Repository;

public class RepositoryService<T> : IRepositoryService<T> where T : class
{
    private readonly AppDbContext _context;
    private readonly DbSet<T> _dbSet;

    public RepositoryService(AppDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<T> GetByIdAsync(int id)
    {
        if (id == 0)
        {
            throw new ArgumentException(null, nameof(id));
        }

        return await _dbSet.FindAsync(id);
    }

    public async Task<T> GetFilteredAsync(Expression<Func<T, bool>> filter)
    {
        return await _dbSet.Where(filter).FirstOrDefaultAsync();
    }

    public async Task AddAsync(T entity)
    {
        if (entity == null)
        {
            throw new ArgumentException(null, nameof(entity));
        }

        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(T entity)
    {
        if (entity == null)
        {
            throw new ArgumentException(null, nameof(entity));
        }

        _dbSet.Update(entity);

        await _context.SaveChangesAsync();

    }

    public async Task DeleteAsync(T entity)
    {
        if (entity == null)
        {
            throw new ArgumentException(null, nameof(entity));
        }

        _dbSet.Remove(entity);

        await _context.SaveChangesAsync();

    }

}