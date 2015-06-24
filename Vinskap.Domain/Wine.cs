using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Domain
{
    public class Wine
    {
        public Wine(string name, Kind kind, Producer producer, double alcohol)
        {
            Name = name;
            Kind = kind;
            Producer = producer;
            Alcohol = alcohol;
        }

        public Kind Kind { get; private set; }

        public string Name;

        public Producer Producer { get; private set; }

        public double Alcohol { get; private set; }

        public override bool Equals(object obj)
        {
            var other = obj as Wine;

            if (other == null)
                return false;

            if(!string.IsNullOrWhiteSpace(other.Name) && !string.IsNullOrWhiteSpace(Name))
            {
                return other.Name.ToLower().Equals(Name.ToLower());                
            }
            else
            {
                if(string.IsNullOrWhiteSpace(other.Name) && string.IsNullOrWhiteSpace(Name))
                {
                    return other.Kind.Equals(Kind) && other.Producer.Equals(Producer);
                }
            }

            return false;           
        }

        public override int GetHashCode()
        {
            return Name.GetHashCode();
        }
    }
}
