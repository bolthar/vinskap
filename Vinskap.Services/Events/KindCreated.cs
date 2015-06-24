using Vinskap.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Services.Events
{
    public class KindCreated : IEvent
    {
        public Kind Kind { get; private set; }
        
        public KindCreated(Kind kind)
        {
            Kind = kind;
        }
    }
}
