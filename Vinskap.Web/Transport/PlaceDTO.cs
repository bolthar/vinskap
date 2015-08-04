using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Vinskap.Domain;
using Vinskap.Domain.Cellar;

namespace Vinskap.Web.Transport
{
    public class PlaceDTO
    {
        public int Row { get; set; }
        public int Column { get; set; }
        public string Aisle { get; set; }
        public RatedBottleDTO Bottle { get; set; }

        public PlaceDTO(int row, int column, string aisle, Bottle bottle, double? score)
        {
            Row = row;
            Column = column;
            Aisle = aisle;
            if (bottle != null)
                Bottle = RatedBottleDTO.From(bottle, score);
        }
    }
}