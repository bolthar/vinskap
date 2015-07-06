using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using Vinskap.Domain;

namespace Vinskap.Web.Transport
{
    [DataContract]
    public class ProducerDTO
    {
        [DataMember]
        public string Name { get; set; }

        public static ProducerDTO From(Producer producer)
        {
            var dto = new ProducerDTO();
            dto.Name = producer.Name;
            return dto;            
        }

        public Producer To()
        {
            return new Producer(Name);
        }
    }
}