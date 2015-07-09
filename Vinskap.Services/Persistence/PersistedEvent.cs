using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Vinskap.Services.Events;
using Dapper;
using Newtonsoft.Json;
using System.Reflection;

namespace Vinskap.Services.Persistence
{
    public class PersistedEvent
    {
        public string EventType { get; private set; }
        public string Payload { get; private set; }

        public IEvent GetEvent()
        {
            var eventType = Type.GetType("Vinskap.Services.Events." + EventType);
            return (IEvent)JsonConvert.DeserializeObject(Payload, eventType);
        }

        public static void Create(IDbConnection connection, IEvent ev)
        {
            var query = "INSERT INTO persisted_events (EventType, Payload) VALUES (@event_type, @payload)";
            connection.Execute(query, new { event_type = ev.GetType().Name, payload = JsonConvert.SerializeObject(ev) });
        }

        public static IEnumerable<PersistedEvent> All(IDbConnection connection)
        {
            return connection.Query<PersistedEvent>("select * from persisted_events ORDER BY id");
        }
    }
}