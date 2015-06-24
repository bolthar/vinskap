using Vinskap.Services.Commands;
using Vinskap.Services.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Services.Repositories
{
    public class EventLog : IEventListener
    {
        private ICollection<IEvent> _log = new List<IEvent>();

        public void Register(IEvent ev)
        {
            _log.Add(ev);
        }
    }
}
