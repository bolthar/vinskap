using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Vinskap.Services;
using Vinskap.Services.Commands;
using Vinskap.Services.Queries;
using Vinskap.Services.Repositories;
using Vinskap.Web.Transport;

namespace Vinskap.Web.Controllers
{
    public class CellarController : ApiController
    {
        [Route("api/cellar/bottles")]
        [HttpGet]
        public IEnumerable<RatedBottleDTO> Bottles(string searchTerm, string sortOption)
        {
            var dto = new BottleSearchDTO { SearchTerm = searchTerm, SortOption = sortOption };
            return new SearchBottle(CellarRepository.Instance.Cellar.Bottles, dto.SearchTerm).Run().OrderByDescending(dto.SortDefinition).Select(x => RatedBottleDTO.From(x, new GetRating(x).Run()));
        }

        [HttpGet]
        public IEnumerable<AisleDTO> Index()
        {
            return CellarRepository.Instance.Cellar.Aisles.Select(x => AisleDTO.From(x));
        }

        [Route("api/cellar/aisle")]
        [HttpGet]
        public IEnumerable<PlaceDTO> AisleBottles(string name)
        {
            return CellarRepository.Instance.Cellar[name].Bottles.Select(x => PlaceDTO.Create(x.Item1, x.Item2, name, x.Item3, new GetRating(x.Item3).Run()));
        }

        [Route("api/cellar/place")]
        [HttpPost]
        public void PlaceBottle(PlaceDTO place)
        {            
            ExecutionContext.Instance.Execute(new PlaceBottle(place.Bottle.Bottle.To(), place.Aisle, place.Row, place.Column));
        }

        [Route("api/cellar/placeFor")]
        [HttpGet]
        public PlaceDTO PlaceForBottle(Guid bottleId)
        {
            var bottle = CellarRepository.Instance.Cellar.Bottles.FirstOrDefault(x => x.Guid == bottleId);
            var result = CellarRepository.Instance.Cellar.PlaceOf(bottle);
            return PlaceDTO.Create(result.Item1, result.Item2, result.Item3, result.Item4, new GetRating(bottle).Run());
        }    
    }
}
