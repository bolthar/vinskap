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
        public string Name { get; set; }

        [DataMember]
        public KindDTO Kind { get; set; }

        [DataMember]
        public ProducerDTO Producer { get; set; }

        [DataMember]
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