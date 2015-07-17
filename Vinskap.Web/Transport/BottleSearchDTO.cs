using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Vinskap.Domain;

namespace Vinskap.Web.Transport
{
    public class BottleSearchDTO
    {
        public string SearchTerm { get; set; }
        public string SortOption { get; set; }

        private IDictionary<string, Func<Bottle, object>> sortDefinitions
        {
            get
            {
                return new Dictionary<string, Func<Bottle, object>> {
                    { "Bought", (b) => -b.AddedAt.Ticks },
                    { "Price", (b) => b.Price },
                    { "Year", (b) => -b.Year },
                    { "Alcohol %", (b) => b.Wine.Alcohol }
                };
            }
        }

        public Func<Bottle, object> SortDefinition
        {
            get
            {
                if (sortDefinitions.ContainsKey(SortOption))
                    return sortDefinitions[SortOption];

                return (b) => true;
            }
        }
        
    }
}
