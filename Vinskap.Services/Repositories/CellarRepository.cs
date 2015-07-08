using Vinskap.Domain;
using Vinskap.Services.Commands;
using Vinskap.Services.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Services.Repositories
{
    public class CellarRepository : IEventListener
    {        
        public EntityCache<Kind> Kinds { get; private set; }
        public EntityCache<Producer> Producers { get; private set; }
        public EntityCache<Wine> Wines { get; private set; }
        public EntityCache<Bottle> Bottles { get; private set; }

        private CellarRepository()
        {
            Kinds = new EntityCache<Kind>();
            Producers = new EntityCache<Producer>();
            Wines = new EntityCache<Wine>();
            Bottles = new EntityCache<Bottle>();

            /*var allegrini = new Producer("Allegrini");
            var sartori = new Producer("Sartori");
            var cecchi = new Producer("Cecchi");
            var milesi = new Producer("Milesi");
            var casanuova = new Producer("Case nuove");
            
            var white = new Kind("Lugana", WineType.WHITE);
            var red = new Kind("Chianti classico", WineType.RED);
            var rosee = new Kind("Chiaretto", WineType.ROSEE);
            var veronese = new Kind("Veronese", WineType.RED);
            var valpolicella = new Kind("Valpolicella", WineType.RED);

            var wines = new List<Wine> {
                new Wine("Palazzo della torre", veronese, allegrini, 11.5),
                new Wine("", valpolicella, allegrini, 13.5),
                new Wine("", valpolicella, sartori, 14),
                new Wine("White wine", white, cecchi, 9.5),
                new Wine("", red, cecchi,11.5),
                new Wine("Ticciaia", red, casanuova, 12.5),
                new Wine("Roseè", rosee, milesi, 10),
                new Wine(string.Empty, red, milesi, 10)
            };

            foreach(var wine in wines)
            {
                Wines.Add(wine);
            }

            Producers.Add(allegrini);
            Producers.Add(sartori);
            Producers.Add(cecchi);
            Producers.Add(milesi);
            Producers.Add(casanuova);
            Kinds.Add(red);
            Kinds.Add(white);
            Kinds.Add(rosee);
            Kinds.Add(veronese);
            Kinds.Add(valpolicella);*/
        }

        public EntityCache<T> Get<T>()
        {
            var type = typeof(T);
            if (type == typeof(Kind))
                return Kinds as EntityCache<T>;
            if (type == typeof(Producer))
                return Producers as EntityCache<T>;
            if (type == typeof(Wine))
                return Wines as EntityCache<T>;
            if (type == typeof(Bottle))
                return Bottles as EntityCache<T>;

            throw new ArgumentException();
        }

        private static CellarRepository _instance;

        public static CellarRepository Instance
        {
            get
            {
                if(_instance == null)
                {
                    _instance = new CellarRepository();
                }

                return _instance;
            }
        }

        private static void Reset()
        {
            _instance = null;
        }

        public void Register(IEvent ev)
        {
            if (ev is KindCreated)
            {
                Kinds.Add((ev as KindCreated).Kind);
            }

            if (ev is ProducerCreated)
            {
                Producers.Add((ev as ProducerCreated).Producer);
            }

            if (ev is WineCreated)
            {
                Wines.Add((ev as WineCreated).Wine);
            }

            if (ev is BottleCreated)
            {
                Bottles.Add((ev as BottleCreated).Bottle);
            }
        }
    }
}
