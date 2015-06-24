using Vinskap.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Services.Commands.Vaildation
{
    public abstract class ValidatorFor<T> : IValidator<T>
    {
        public abstract IEnumerable<ErrorMessage> Errors { get; }

        public abstract Maybe<T> Activate();

        public Maybe<T> Commit()
        {
            if(this.Errors.Any())
            {
                return new Nothing<T>();
            }

            return this.Activate();
        }
    }
}
