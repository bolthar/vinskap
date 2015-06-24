namespace Vinskap.Domain
{
    public class Kind
    {
        public Kind(string name, WineType wineType)
        {
            Name = name;
            Type = wineType;
        }

        public string Name { get; private set; }

        public WineType Type { get; private set; }

        public override bool Equals(object obj)
        {
            var other = obj as Kind;

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
