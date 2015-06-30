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
        public WineType Type { get; private set; }

        public static KindDTO From(Kind kind)
        {
            var dto = new KindDTO();
            dto.Name = kind.Name;
            dto.Type = kind.Type;
            return dto;
        }

        public Kind To()
        {
            return new Kind(Name, Type);
        }
    }
}