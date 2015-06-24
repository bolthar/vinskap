using Vinskap.Domain;
using Vinskap.Functional;
using System.Collections.Generic;

namespace Vinskap.Services.Commands.Vaildation
{
    public class ValidateWine : ValidatorFor<Wine>
    {
        private string _name;
        private Maybe<Kind> _kind;
        private Maybe<Producer> _producer;
        private double _alcohol;

        public ValidateWine(string name, Maybe<Kind> kind, Maybe<Producer> producer, double alcohol)
        {
            _name = name;
            _kind = kind;
            _producer = producer;
            _alcohol = alcohol;
        }

        public override IEnumerable<ErrorMessage> Errors
        {
            get 
            {
                if (_kind is Nothing<Kind>)
                    yield return new ErrorMessage("Kind", "Kind is not valid");

                if (_producer is Nothing<Producer>)
                    yield return new ErrorMessage("Producer", "Producer is not valid");

                if (_alcohol == default(double))
                    yield return new ErrorMessage("Alcohol", "Alcohol must be inputted");
            }
        }

        public override Maybe<Wine> Activate()
        {
            return _kind.Bind(x => _producer.Bind(y => new Wine(_name, x, y, _alcohol).ToMaybe()));
        }
    }
}
