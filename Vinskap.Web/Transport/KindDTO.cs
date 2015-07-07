using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using Vinskap.Domain;

namespace Vinskap.Web.Transport
{
    [DataContract]
    public class KindDTO
    {
        [DataMember]
        public string Name { get; private set; }

        [DataMember]
        public string Type { get; private set; }

        public static KindDTO From(Kind kind)
        {
            var dto = new KindDTO();
            dto.Name = kind.Name;
            dto.Type = kind.Type.ToString().ToLower();
            return dto;
        }

        public Kind To()
        {
            return new Kind(Name, (WineType)Enum.Parse(typeof(WineType), this.Type.ToUpper()));
        }
    }
}