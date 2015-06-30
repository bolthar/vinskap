using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinskap.Domain;
using Vinskap.Services.Repositories;

namespace Vinskap.Services.Queries
{
    public class SearchProducer
    {
        private string _searchTerm;

        public SearchProducer(string searchTerm)
        {
            _searchTerm = searchTerm;
        }

        public IEnumerable<Producer> Run()
        {
            var startWith = CellarRepository.Instance.Producers
                .Where(x => x.Name.ToLower().StartsWith(_searchTerm));
            var contain = CellarRepository.Instance.Producers
                .Where(x => x.Name.ToLower().Contains(_searchTerm));

            return startWith.Union(contain).Distinct();
        }
    }
}
