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
        public int Rows { get; private set; }
        public int Columns { get; private set; }

        private Place[,] _places;

        public Aisle(string name, int nRows, int nColumns)
        {
            Name = name;
            Rows = nRows;
            Columns = nColumns;
            _places = new Place[Rows, Columns];
        }

        public Place this[int row, int column]
        {
            get
            {
                return getPlace(row, column);
            }
        }

        public IEnumerable<Tuple<int, int, Bottle>> Bottles
        {
            get
            {                
                for(int i = 0; i < Rows; i++)
                {
                    for(int j = 0; j < Columns; j++)
                    {
                        var bottle = getPlace(i, j).Bottle;
                        if (bottle != null)
                            yield return new Tuple<int, int, Bottle>(i, j, bottle);
                    }
                }
            }
        }

        private Place getPlace(int row, int column)
        {
            if(Rows > row && Columns > column)
            {
                if (_places[row, column] == null)
                    _places[row, column] = new Place();

                return _places[row, column];
            }

            return null;
        }

        

    }
}
