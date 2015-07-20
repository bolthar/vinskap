using Vinskap.Domain;
using Vinskap.Functional;
using Vinskap.Services.Commands.Vaildation;
using Vinskap.Services.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Services.Commands
{
    public class CreateBottle : IEventSource
    {
        private Bottle _bottle;
        public event Action<IEvent> Fire;

        public CreateBottle(Bottle bottle)
        {
            _bottle = bottle;
        }

        public void Execute()
        {
            new ValidateBottle(_bottle.Wine.ToMaybe()
                .Bind(x => new ValidateWine(x.Name,
                    x.Kind.ToMaybe().Bind(y => new ValidateKind(y.Name, y.Type).Commit()),
                    x.Producer.ToMaybe().Bind(y => new ValidateProducer(y.Name).Commit()),
                    x.Alcohol).Commit()),
                 _bottle.Year, _bottle.Price).Commit()
            .Bind(x =>
            {
                new UniquenessConstraint<Producer>(() => x.Wine.Producer.ToMaybe()).Commit().Bind(y => Fire(new ProducerCreated(y)));
                new UniquenessConstraint<Kind>(() => x.Wine.Kind.ToMaybe()).Commit().Bind(y => Fire(new KindCreated(y)));
                new UniquenessConstraint<Wine>(() => x.Wine.ToMaybe()).Commit().Bind(y => Fire(new WineCreated(y)));
                Fire(new BottleCreated(x));
            });
        }
    }
}
 