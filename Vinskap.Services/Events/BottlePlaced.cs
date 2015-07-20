using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinskap.Domain;

namespace Vinskap.Services.Events
{
    public class BottlePlaced : IEvent
    {
        public Bottle Bottle { get; private set; }
        public string Aisle { get; private set; }
        public int Row { get; private set; }
        public int Column { get; private set; }

        public BottlePlaced(Bottle bottle, string aisle, int row, int column)
        {
            Bottle = bottle;
            Aisle = aisle;
            Row = row;
            Column = column;
        }
    }
}
