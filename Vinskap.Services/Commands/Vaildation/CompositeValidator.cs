using Vinskap.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Services.Commands.Vaildation
{
    public static class ValidatorExtensions
    {
        public static IValidator<T> Plus<T>(this IValidator<T> first, IValidator<T> next)
        {
            return new CompositeValidator<T>(first, next);       
        }
    }

    public class CompositeValidator<T> : IValidator<T>
    {
        private IValidator<T> _first;
        private IValidator<T> _second;

        public CompositeValidator(IValidator<T> first, IValidator<T> second)
        {
            _first = first;
            _second = second;
        }

        public IEnumerable<ErrorMessage> Errors
        {
            get 
            {
                return _first.Errors.Concat(_second.Errors);
            }
        }

        public Maybe<T> Commit()
        {
            return _first.Commit().Bind(x => _second.Commit());
        }
    }
}
