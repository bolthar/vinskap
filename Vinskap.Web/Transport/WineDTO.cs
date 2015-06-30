using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using Vinskap.Domain;

namespace Vinskap.Web.Transport
{
    [DataContract]
    public class WineDTO
    {
        [DataMember]
        public string Name { get; private set; }

        [DataMember]
        public KindDTO Kind { get; private set; }

        [DataMember]
        public ProducerDTO Producer { get; private set; }

        [DataMember]
        public double Alcohol { get; private set; }

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
            return new Wine(Name, Kind.To(), Producer.To(), Alcohol);
        }
    }
}