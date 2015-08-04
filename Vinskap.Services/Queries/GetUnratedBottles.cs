using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinskap.Domain;
using Vinskap.Services.Repositories;

namespace Vinskap.Services.Queries
{
    public class GetUnratedBottles
    {
        public IEnumerable<Bottle> Run()
        {
            return CellarRepository.Instance.WasteBin.Where(x => CellarRepository.Instance.Ratings.All(y => !y.Bottle .Equals(x)));
        }
    }
}
