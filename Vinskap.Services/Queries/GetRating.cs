using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinskap.Domain;
using Vinskap.Services.Repositories;

namespace Vinskap.Services.Queries
{
    public class GetRating
    {
        Bottle _bottle;

        public GetRating(Bottle bottle)
        {
            _bottle = bottle;
        }

        public double? Run()
        {
            var ratings = CellarRepository.Instance.Ratings.Where(x => x.Bottle.Wine.Equals(_bottle.Wine));
            if (ratings.Any())
                return ratings.Select(x => x.Score).Average();

            return null;

        }
    }
}
