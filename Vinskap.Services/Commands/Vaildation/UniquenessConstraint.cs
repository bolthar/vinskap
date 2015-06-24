using Vinskap.Functional;
using Vinskap.Services.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Services.Commands.Vaildation
{
    public class UniquenessConstraint<T> : ValidatorFor<T>
    {
        private Func<Maybe<T>> _value;

        public UniquenessConstraint(Func<Maybe<T>> value)
        {
            _value = value;
        }

        public override IEnumerable<ErrorMessage> Errors
        {
            get
            {
                var result = new List<ErrorMessage>();
                Activate().Bind(x =>
                {
                    if (CellarRepository.Instance.Get<T>().Any(y => y.Equals(x)))
                        result.Add(new ErrorMessage(string.Empty, string.Format("{0} already exists", typeof(T).Name)));
                });

                return result;
            }
        }

        public override Maybe<T> Activate()
        {
            return _value();
        }
    }
}
