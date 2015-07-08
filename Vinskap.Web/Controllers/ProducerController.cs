using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Vinskap.Domain;
using Vinskap.Services.Commands;
using Vinskap.Services.Commands.Vaildation;
using Vinskap.Services.Queries;
using Vinskap.Web.Transport;

namespace Vinskap.Web.Controllers
{
    public class ProducerController : ApiController
    {
        [HttpGet]
        public IEnumerable<ProducerDTO> Index(string searchTerm)
        {
            var result = new SearchProducer(searchTerm).Run();
            return result.Select(x => ProducerDTO.From(x));
        }

        [Route("api/producer/validate")]
        [HttpPost]
        public IEnumerable<ErrorMessage> Validate(ProducerDTO producer)
        {
            var entity = producer.To();
            var validator = new ValidateProducer(entity.Name);
            var uniqueness = new UniquenessConstraint<Producer>(() => validator.Commit());
            return validator.Errors.Union(uniqueness.Errors);           
        }
    }
}
