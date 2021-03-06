﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Domain
{
    public class Bottle
    {
        public Bottle(Guid guid, Wine wine, int year, double? price, DateTime addedAt)
        {
            Guid = guid;
            Wine = wine;
            Year = year;
            Price = price;
            AddedAt = addedAt;
        }

        public Guid Guid { get; private set; }

        public Wine Wine { get; private set; }

        public int Year { get; private set; }

        public double? Price { get; private set; }

        public DateTime AddedAt { get; private set; }

        public override bool Equals(object obj)
        {
            var other = obj as Bottle;

            if (other == null)
                return false;

            return other.Guid.Equals(this.Guid);
        }

        public override int GetHashCode()
        {
            return Guid.GetHashCode();
        }

    }
}
