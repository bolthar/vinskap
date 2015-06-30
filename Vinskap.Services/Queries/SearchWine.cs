using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinskap.Domain;
using Vinskap.Services.Repositories;

namespace Vinskap.Services.Queries
{
    public class SearchWine
    {
        private string _searchTerm;

        public SearchWine(string searchTerm)
        {
            _searchTerm = searchTerm.ToLower();
        }

        public IEnumerable<Wine> Run()
        {
            var startWith = CellarRepository.Instance.Wines
                .Where(x => x.Name.ToLower().StartsWith(_searchTerm));
            var contain = CellarRepository.Instance.Wines
                .Where(x => x.Name.ToLower().Contains(_searchTerm));

            return startWith.Union(contain).Distinct();
        }
    }
}
