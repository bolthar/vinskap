using Vinskap.Services.Commands;
using Vinskap.Services.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Data;
using Vinskap.Services.Persistence;

namespace Vinskap.Services.Repositories
{
    public class EventLog : IEventListener
    {
        private IDbConnection _connection;

        public EventLog(IDbConnection connection)
        {
            _connection = connection;
            _log = PersistedEvent.All(connection).Select(x => x.GetEvent()).ToList();
        }

        private ICollection<IEvent> _log = new List<IEvent>();

        public void Register(IEvent ev)
        {
            _log.Add(ev);
            PersistedEvent.Create(_connection, ev);
        }

        public IEnumerable<IEvent> Events
        {
            get { return _log; }
        }

        public static EventLog Instance;

        public static void Setup(string connectionString)
        {
            Instance = new EventLog(new Npgsql.NpgsqlConnection(connectionString));
        }
    }
}
