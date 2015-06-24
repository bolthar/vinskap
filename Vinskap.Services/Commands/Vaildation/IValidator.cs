using Vinskap.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Services.Commands.Vaildation
{
    public interface IValidator<T>
    {
        IEnumerable<ErrorMessage> Errors { get; }
        Maybe<T> Commit();
    }

    public class NoOpValidator<T> : IValidator<T>
    {
        public IEnumerable<ErrorMessage> Errors
        {
            get
            {
                return Enumerable.Empty<ErrorMessage>();
            }
        }


        public Maybe<T> Commit()
        {
            return new Nothing<T>();
        }
    }
}
