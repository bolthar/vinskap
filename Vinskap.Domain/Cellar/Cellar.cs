using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Domain.Cellar
{
    public class Cellar
    {
        public IList<Aisle> Aisles { get; private set; }

        public Cellar()
        {
            Aisles = new List<Aisle>();
        }

        public void AddAisle(Aisle aisle)
        {
            Aisles.Add(aisle);
        }

        public Aisle this[string name]
        {
            get
            {
                return Aisles.FirstOrDefault(x => x.Name == name);                    
            }
        }

        public IEnumerable<Bottle> Bottles
        {
            get
            {
                return Aisles.SelectMany(x => x.Bottles).Select(x => x.Item3);
            }
        }

        public Place PlaceOf(Bottle bottle)
        {
            foreach(var aisle in Aisles)
            {
                var place = aisle.Bottles.FirstOrDefault(x => x.Item3 == bottle);
                if (place != null)
                    return aisle[place.Item1, place.Item2];
            }

            return null;            
        }
    }
}
