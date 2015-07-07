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
    public class KindController : ApiController
    {
        [HttpGet]
        public IEnumerable<KindDTO> Index(string searchTerm)
        {
            var result = new SearchKind(searchTerm).Run();
            return result.Select(x => KindDTO.From(x));
        }

        [Route("api/kind/validate")]
        [HttpPost]
        public IEnumerable<ErrorMessage> Validate(KindDTO kind)
        {
            var kindEntity = kind.To();
            var validator = new ValidateKind(kindEntity.Name, kindEntity.Type);
            var uniqueness = new UniquenessConstraint<Kind>(() => validator.Commit());
            return validator.Errors.Union(uniqueness.Errors);
        }
    }
}
