using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Vinskap.Domain;

namespace Vinskap.Web.Transport
{
    public class WineDTO
    {
        public string Name { get; set; }

        public KindDTO Kind { get; set; }

        public ProducerDTO Producer { get; set; }

        public double Alcohol { get; set; }

        public static WineDTO From(Wine wine)
        {
            var dto = new WineDTO();
            dto.Name = wine.Name;
            dto.Kind = KindDTO.From(wine.Kind);
            dto.Producer = ProducerDTO.From(wine.Producer);
            dto.Alcohol = wine.Alcohol;            
            return dto;
        }

        public Wine To()
        {
            return new Wine(Name, Kind == null ? null : Kind.To(), Producer == null ? null : Producer.To(), Alcohol);
        }
    }
}