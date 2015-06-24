using Vinskap.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Services.Events
{
    public class BottleCreated : IEvent
    {
        public Bottle Bottle { get; private set; }

        public BottleCreated(Bottle bottle)
        {
            Bottle = bottle;
        }

    }
}
