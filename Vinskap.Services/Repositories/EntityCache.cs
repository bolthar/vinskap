using Vinskap.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Services.Repositories
{
    public class EntityCache<T> : IQueryable<T>
    {
        private ICollection<T> _cache = new List<T>();

        public void Add(T entity)
        {
            _cache.Add(entity);
        }

        public void Remove(T entity)
        {
            _cache.Remove(entity);
        }

        #region IQueryable members
        public IEnumerator<T> GetEnumerator()
        {
            return _cache.GetEnumerator();
        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return _cache.GetEnumerator();
        }

        public Type ElementType
        {
            get { return _cache.AsQueryable<T>().ElementType; }
        }

        public System.Linq.Expressions.Expression Expression
        {
            get { return _cache.AsQueryable<T>().Expression; }
        }

        public IQueryProvider Provider
        {
            get { return _cache.AsQueryable<T>().Provider; }
        }
        #endregion
    }
}
