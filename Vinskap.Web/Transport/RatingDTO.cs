using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Vinskap.Domain;

namespace Vinskap.Web.Transport
{
    public class RatingDTO
    {
        public BottleDTO Bottle { get; set; }
        public int Score { get; set; }
    }
}