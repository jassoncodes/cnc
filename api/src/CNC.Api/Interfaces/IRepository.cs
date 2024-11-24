using System.Linq.Expressions;
using CNC.Api.Interfaces;

namespace CNC.Api.Interfaces;

public interface IRepositoryService<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> GetByIdAsync(int id);
    Task<T> GetFilteredAsync(Expression<Func<T, bool>> filter);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
}