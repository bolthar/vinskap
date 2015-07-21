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
        public IEnumerable<BottleDTO> Bottles(string searchTerm, string sortOption)
        {
            var dto = new BottleSearchDTO { SearchTerm = searchTerm, SortOption = sortOption };
            return new SearchBottle(CellarRepository.Instance.Cellar.Bottles, dto.SearchTerm).Run().OrderByDescending(dto.SortDefinition).Select(x => BottleDTO.From(x));
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
            return CellarRepository.Instance.Cellar[name].Bottles.Select(x => new PlaceDTO(x.Item1, x.Item2, name, x.Item3));
        }

        [Route("api/cellar/place")]
        [HttpPost]
        public void PlaceBottle(PlaceDTO place)
        {            
            ExecutionContext.Instance.Execute(new PlaceBottle(place.Bottle.To(), place.Aisle, place.Row, place.Column));
        }
    
    }
}
