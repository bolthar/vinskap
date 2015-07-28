using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinskap.Domain;

namespace Vinskap.Services.Events
{
    public class BottleRated : IEvent
    {
        public Rating Rating { get; private set; }

        public BottleRated(Rating rating)
        {
            Rating = rating;
        }
    }
}
