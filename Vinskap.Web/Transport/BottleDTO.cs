using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Vinskap.Domain;

namespace Vinskap.Web.Transport 
{
    public class BottleDTO
    {
        public WineDTO Wine { get; set; }
        public int Year { get; set; }
        public double? Price { get; set; }
        public DateTime AddedAt { get; set; }
        public Guid Guid { get; set; }

        public static BottleDTO From(Bottle bottle)
        {
            var dto = new BottleDTO();
            dto.Guid = bottle.Guid;
            dto.Wine = WineDTO.From(bottle.Wine);
            dto.Year = bottle.Year;
            dto.Price = bottle.Price;
            dto.AddedAt = bottle.AddedAt;
            return dto;
        }

        public Bottle To()
        {
            return new Bottle(Guid.Equals(Guid.Empty) ? Guid.NewGuid() : Guid, Wine == null ? null : Wine.To(), Year, Price, AddedAt);
        }
    }
}