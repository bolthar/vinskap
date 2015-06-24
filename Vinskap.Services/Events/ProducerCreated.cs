using Vinskap.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Services.Events
{
    public class ProducerCreated : IEvent
    {
        public Producer Producer { get; private set; }

        public ProducerCreated(Producer producer)
        {
            Producer = producer;
        }
    }
}
