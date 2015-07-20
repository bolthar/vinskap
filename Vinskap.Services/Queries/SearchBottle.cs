﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinskap.Domain;
using Vinskap.Services.Repositories;

namespace Vinskap.Services.Queries
{
    public class SearchBottle
    {
        private string _searchTerm;
        private IEnumerable<Bottle> _source;

        public SearchBottle(IEnumerable<Bottle> source, string searchTerm)
        {
            _searchTerm = searchTerm.ToLower();
            _source = source;
        }

        public IEnumerable<Bottle> Run()
        {
            var year = 0;
            int.TryParse(_searchTerm, out year);
            var matchesYear = _source
                .Where(x => x.Year == year);
            var wines = new SearchWine(_searchTerm).Run().ToList();
            var fromWine = _source
                .Where(x => wines.Contains(x.Wine));

            return matchesYear.Union(fromWine).Distinct();
        }
    }
}
