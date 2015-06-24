using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Services.Events
{
    public interface IEventListener
    {
        void Register(IEvent ev);
    }
}
