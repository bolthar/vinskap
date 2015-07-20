using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Vinskap.Services.Events;

namespace Vinskap.Services.Commands
{
    public interface IEventSource
    {
        event Action<IEvent> Fire;
        void Execute();
    }
}
