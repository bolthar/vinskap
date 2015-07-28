using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Domain
{
    public class Rating
    {
        public Rating(Bottle bottle, int score, DateTime addedAt)
        {
            Bottle = bottle;
            Score = score;
            AddedAt = addedAt;
        }

        public Bottle Bottle { get; private set; }

        public int Score { get; private set; }

        public DateTime AddedAt { get; private set; }
    }
}
