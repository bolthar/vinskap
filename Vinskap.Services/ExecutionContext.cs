﻿using Vinskap.Domain;
using Vinskap.Functional;
using Vinskap.Services.Commands;
using Vinskap.Services.Events;
using Vinskap.Services.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Npgsql;

namespace Vinskap.Services
{
    public class ExecutionContext
    {
        private IEnumerable<IEventListener> _listeners;
        private EventLog _log = new EventLog(new NpgsqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["default"].ConnectionString)); 

        private ExecutionContext()
        {
            _listeners = new List<IEventListener> 
            {
                CellarRepository.Instance,
                _log                
            };
        }

        private static ExecutionContext _instance;

        public static ExecutionContext Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new ExecutionContext();

                return _instance;
            }
        }

        public Maybe<Bottle> Execute(CreateBottle createBottle)
        {
            createBottle.Fire += createBottle_Fire;
            var result = createBottle.Execute();
            createBottle.Fire -= createBottle_Fire;
            return result;
        }

        void createBottle_Fire(IEvent obj)
        {
            foreach (var listener in _listeners)
                listener.Register(obj);
        }
    }
}
