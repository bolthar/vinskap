using Vinskap.Domain;
using Vinskap.Functional;
using System.Collections.Generic;

namespace Vinskap.Services.Commands.Vaildation
{
    public class ValidateProducer : ValidatorFor<Producer>
    {
        private string _name;

        public ValidateProducer(string name)
        {
            _name = name;
        }

        public override IEnumerable<ErrorMessage> Errors
        {
            get
            {
                if (string.IsNullOrEmpty(_name))
                    yield return new ErrorMessage("Name", "Name cannot be empty");
            }
        }

        public override Maybe<Producer> Activate()
        {
            return new Producer(_name).ToMaybe();
        }
    }
}
