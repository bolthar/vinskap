using Vinskap.Domain;

namespace Vinskap.Web.Transport
{
    public class ProducerDTO
    {
        public string Name { get; set; }

        public static ProducerDTO From(Producer producer)
        {
            var dto = new ProducerDTO();
            dto.Name = producer.Name;
            return dto;            
        }

        public Producer To()
        {
            return new Producer(Name);
        }
    }
}