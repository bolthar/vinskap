using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.Domain
{
    public class Producer
    {
        public Producer(string name)
        {
            Name = name;
        }

        public string Name { get; private set; }        

        public override bool Equals(object obj)
        {
            var other = obj as Producer;

            if (other == null || other.Name == null)
                return false;

            return other.Name.ToLower().Equals(Name.ToLower());
        }

        public override int GetHashCode()
        {
            return Name.GetHashCode();
        }
    }
}
