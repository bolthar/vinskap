using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinskap.Functional;
using Vinskap.Domain;
using Vinskap.Services.Commands.Vaildation;
using Vinskap.Services.Events;

namespace Vinskap.Services.Commands
{
    public class RateBottle : IEventSource
    {
        public event Action<IEvent> Fire;

        private Bottle _bottle;
        private int _score;

        public RateBottle(Bottle bottle, int score)
        {
            _bottle = bottle;
            _score = score;
        }

        public void Execute()
        {
            new ValidateRating(_bottle, _score).Commit().Bind(x => Fire(new BottleRated(x)));                
        }
    }
}
