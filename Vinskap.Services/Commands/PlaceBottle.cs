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
    public class PlaceBottle : IEventSource
    {
        public event Action<IEvent> Fire;

        private Bottle _bottle;
        private string _aisle;
        private int _row;
        private int _column;

        public PlaceBottle(Bottle bottle, string aisle, int row, int column)
        {
            _bottle = bottle;
            _aisle = aisle;
            _row = row;
            _column = column;
        }

        public void Execute()
        {
            var bottle = CellarRepository.Instance.Bottles.FirstOrDefault(x => x.Equals(_bottle));            
            bottle.ToMaybe().Bind(x =>
                {
                    CellarRepository.Instance.Cellar[_aisle]
                        .ToMaybe().Bind(a =>
                        {
                            a[_row, _column].ToMaybe().Bind(p =>
                            {
                                Fire(new BottlePlaced(x, a.Name, _row, _column));
                            });
                        });
                });
                
        }
    }
}
