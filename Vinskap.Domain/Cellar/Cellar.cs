using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Domain.Cellar
{
    public class Cellar
    {
        private IList<Aisle> _aisles = new List<Aisle>();

        public void AddAisle(Aisle aisle)
        {
            _aisles.Add(aisle);
        }

        public Aisle this[string name]
        {
            get
            {
                return _aisles.FirstOrDefault(x => x.Name == name);                    
            }
        }

        public IEnumerable<Bottle> Bottles
        {
            get
            {
                return _aisles.SelectMany(x => x.Bottles);
            }
        }
    }
}
