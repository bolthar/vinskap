using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinskap.Domain;
using Vinskap.Functional;
using Vinskap.Services.Repositories;

namespace Vinskap.Services.Commands.Vaildation
{
    public class ValidateRating : ValidatorFor<Rating>
    {
        private Bottle _bottle;
        private int _score;

        public ValidateRating(Bottle bottle, int score)
        {
            _bottle = bottle;
            _score = score;
        }

        public override IEnumerable<ErrorMessage> Errors
        {
            get
            {
                if (!CellarRepository.Instance.WasteBin.Any(x => x == _bottle))
                    yield return new ErrorMessage("Bottle", "Can't rate the bottle if still closed");

                if (_score > 5 || _score < 1)
                    yield return new ErrorMessage("Score", "Score out of bounds");
            }
        }

        public override Maybe<Rating> Activate()
        {
            return new Rating(_bottle, _score, DateTime.Now).ToMaybe();
        }
    }
}
