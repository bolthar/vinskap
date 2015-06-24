using Vinskap.Domain;
using Vinskap.Functional;
using System;
using System.Collections.Generic;

namespace Vinskap.Services.Commands.Vaildation
{
    public class ValidateBottle : ValidatorFor<Bottle>
    {
        private Maybe<Wine> _wine;
        private int _year;
        private double? _price;

        public ValidateBottle(Maybe<Wine> wine, int year, double? price)
        {
            _wine = wine;
            _year = year;
            _price = price;
        }

        public override IEnumerable<ErrorMessage> Errors
        {
            get 
            {
                if (_year == default(int))
                    yield return new ErrorMessage("Year", "Year must be inputted");

                if(_year < 1970)
                    yield return new ErrorMessage("Year", "You cannot afford wine this old ;-)");

                if (_year > DateTime.Now.Year)
                    yield return new ErrorMessage("Year", "Year set into the future");

                if (_wine is Nothing<Wine>)
                    yield return new ErrorMessage("Wine", "Wine is not valid");
            }
        }

        public override Maybe<Bottle> Activate()
        {
            return _wine.Bind(x => new Bottle(x, _year, _price, DateTime.Now).ToMaybe());
            
        }
    }
}
