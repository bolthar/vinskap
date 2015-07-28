using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Vinskap.Domain;

namespace Vinskap.Web.Transport
{
    public class RatedBottleDTO
    {
        public BottleDTO Bottle { get; set; }
        public double? Score { get; set; }

        public static RatedBottleDTO From(Bottle bottle, double? score)
        {
            return new RatedBottleDTO { Bottle = BottleDTO.From(bottle), Score = score };
        }
    }
}