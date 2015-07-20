using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Vinskap.Services.Queries;
using Vinskap.Services.Repositories;
using Vinskap.Web.Transport;

namespace Vinskap.Web.Controllers
{
    public class CellarController : ApiController
    {
        [HttpGet]
        public IEnumerable<BottleDTO> Index(string searchTerm, string sortOption)
        {
            var dto = new BottleSearchDTO { SearchTerm = searchTerm, SortOption = sortOption };
            return new SearchBottle(CellarRepository.Instance.Cellar.Bottles, dto.SearchTerm).Run().OrderByDescending(dto.SortDefinition).Select(x => BottleDTO.From(x));
        }
    }
}
