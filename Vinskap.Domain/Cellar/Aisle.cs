using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Domain.Cellar
{
    public class Aisle
    {
        public string Name { get; private set; }

        private Place[,] _places;

        public Aisle(string name, int nRows, int nColumns)
        {
            Name = name;
            _places = new Place[nRows, nColumns];
        }

        public Place this[int row, int column]
        {
            get
            {
                return getPlace(row, column);
            }
        }

        public IEnumerable<Bottle> Bottles
        {
            get
            {                
                return _places.OfType<Place>().Select(x => x.Bottle);
            }
        }

        private Place getPlace(int row, int column)
        {
            if(_places.GetLength(0) > row && _places.GetLength(1) > column)
            {
                if (_places[row, column] == null)
                    _places[row, column] = new Place();

                return _places[row, column];
            }

            return null;
        }

        

    }
}
