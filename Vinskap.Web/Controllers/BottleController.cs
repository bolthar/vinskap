using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Vinskap.Services.Commands;
using Vinskap.Services.Commands.Vaildation;
using Vinskap.Web.Transport;
using Vinskap.Functional;
using Vinskap.Domain;
using Vinskap.Services;
using Vinskap.Services.Queries;
using Vinskap.Services.Repositories;

namespace Vinskap.Web.Controllers
{
    public class BottleController : ApiController
    {

        [Route("api/bottles/unplaced")]
        [HttpGet]
        public IEnumerable<RatedBottleDTO> UnplacedBottles(string searchTerm, string sortOption)
        {
            var dto = new BottleSearchDTO { SearchTerm = searchTerm, SortOption = sortOption };
            return new SearchBottle(CellarRepository.Instance.Storage, dto.SearchTerm).Run().OrderByDescending(dto.SortDefinition).Select(x => RatedBottleDTO.From(x, new GetRating(x).Run()));
        }

        [Route("api/bottle/validate")]
        [HttpPost]
        public IEnumerable<ErrorMessage> Validate(BottleDTO bottle)
        {            
            var entity = bottle.To();
            var validator = new ValidateBottle(entity.Wine.ToMaybe(), entity.Year, entity.Price);
            return validator.Errors;            
        }

        [HttpPost]
        public void Create(BottleDTO bottle)
        {
            var entity = bottle.To();
            ExecutionContext.Instance.Execute(new CreateBottle(entity));
        }
    }
}
