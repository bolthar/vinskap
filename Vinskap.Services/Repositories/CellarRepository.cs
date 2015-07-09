﻿using Vinskap.Domain;
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
                Bottles.Add((ev as BottleCreated).Bottle);
            }
        }
    }
}
