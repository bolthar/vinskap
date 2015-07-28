using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinskap.Domain;

namespace Vinskap.Services.Events
{
    public class BottleOpened: IEvent
    {
        public Bottle Bottle { get; private set; }

        public BottleOpened(Bottle bottle)
        {
            Bottle = bottle;
        }
    }
}
