using Vinskap.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Services.Events
{
    public class WineCreated : IEvent
    {
        public Wine Wine { get; private set; }

        public WineCreated(Wine wine)
        {
            Wine = wine;
        }
    }
}
