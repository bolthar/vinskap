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
using Vinskap.Functional;

namespace Vinskap.Web.Controllers
{
    public class WineController : ApiController
    {
        [HttpGet]
        public IEnumerable<WineDTO> Index(string searchTerm)
        {
            var result = new SearchWine(searchTerm).Run();
            return result.Select(x => WineDTO.From(x));
        }

        [Route("api/wine/validate")]
        [HttpPost]
        public IEnumerable<ErrorMessage> Validate(WineDTO wine)
        {
            var entity = wine.To();
            var validator = new ValidateWine(entity.Name, entity.Kind.ToMaybe(), entity.Producer.ToMaybe(), entity.Alcohol);
            var uniqueness = new UniquenessConstraint<Wine>(() => validator.Commit());
            return validator.Errors.Union(uniqueness.Errors);
        }
    }
}
