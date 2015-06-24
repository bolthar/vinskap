using Vinskap.Domain;
using Vinskap.Functional;
using System.Collections.Generic;

namespace Vinskap.Services.Commands.Vaildation
{
    public class ValidateKind : ValidatorFor<Kind>
    {
        private string _name;
        private WineType _wineType;

        public ValidateKind(string name, WineType wineType)
        {
            _name = name;
            _wineType = wineType;
        }

        public override IEnumerable<ErrorMessage> Errors
        {
            get
            {
                if (string.IsNullOrEmpty(_name))
                    yield return new ErrorMessage("Name", "Name cannot be empty");
            }
        }

        public override Maybe<Kind> Activate()
        {
            return new Kind(_name, _wineType).ToMaybe();
        }
    }
}
