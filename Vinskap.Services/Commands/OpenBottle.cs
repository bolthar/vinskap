using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinskap.Domain;
using Vinskap.Functional;
using Vinskap.Services.Events;
using Vinskap.Services.Repositories;

namespace Vinskap.Services.Commands
{
    public class OpenBottle: IEventSource
    {
        public event Action<IEvent> Fire;

        private Bottle _bottle;

        public OpenBottle(Bottle bottle)
        {
            _bottle = bottle;
        }

        public void Execute()
        {
           var bottle = CellarRepository.Instance.Cellar.Bottles.FirstOrDefault(x => x.Equals(_bottle));            
           bottle.ToMaybe().Bind(x =>
                {
                    Fire(new BottleOpened(x));
                });
        }
    }
}
