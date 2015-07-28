using Vinskap.Domain;
using Vinskap.Services.Commands;
using Vinskap.Services.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Vinskap.Domain.Cellar;

namespace Vinskap.Services.Repositories
{
    public class CellarRepository : IEventListener
    {        
        public EntityCache<Kind> Kinds { get; private set; }
        public EntityCache<Producer> Producers { get; private set; }
        public EntityCache<Wine> Wines { get; private set; }
        public EntityCache<Bottle> WasteBin { get; private set; }
        public EntityCache<Bottle> Storage { get; private set; }
        public EntityCache<Rating> Ratings { get; private set; }
        public Cellar Cellar { get; private set; }

        private CellarRepository()
        {
            Kinds = new EntityCache<Kind>();
            Producers = new EntityCache<Producer>();
            Wines = new EntityCache<Wine>();
            WasteBin = new EntityCache<Bottle>();
            Storage = new EntityCache<Bottle>();
            Ratings = new EntityCache<Rating>();
            Cellar = new Cellar();
            Cellar.AddAisle(new Aisle("A", 9, 3));
            Cellar.AddAisle(new Aisle("B", 9, 3));
            Cellar.AddAisle(new Aisle("C", 9, 3));
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
                    foreach(var ev in EventLog.Instance.Events)
                    {
                        _instance.Register(ev);
                    }
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
                Storage.Add((ev as BottleCreated).Bottle);
            }            

            if(ev is BottleOpened)
            {
                var bo = ev as BottleOpened;
                var bottle = Cellar.Bottles.Where(x => x == bo.Bottle).FirstOrDefault();
                var bottlePlace = this.Cellar.PlaceOf(bottle);
                bottlePlace.Bottle = null;
                WasteBin.Add(bottle);
            }

            if(ev is BottleRated)
            {
                Ratings.Add((ev as BottleRated).Rating);
            }

            if (ev is BottlePlaced)
            {                
                var bottlePlaced = ev as BottlePlaced;
                var place = Cellar[bottlePlaced.Aisle][bottlePlaced.Row, bottlePlaced.Column];
                var bottleToBePlaced = Storage.FirstOrDefault(x => x.Equals(bottlePlaced.Bottle));
                var bottleAlreadyThere = place.Bottle;
                Storage.Remove(bottleToBePlaced);
                place.Bottle = bottleToBePlaced;
                if (bottleAlreadyThere != null)
                    Storage.Add(bottleAlreadyThere);
            }
        }
    }
}
