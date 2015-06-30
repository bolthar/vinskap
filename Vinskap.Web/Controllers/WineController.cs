using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Vinskap.Domain;
using Vinskap.Services.Queries;
using Vinskap.Web.Transport;

namespace Vinskap.Web.Controllers
{
    public class WineController : ApiController
    {
        [HttpGet]
        public IEnumerable<WineDTO> Index()
        {
            var result = new SearchWine("s").Run();
            return result.Select(x => WineDTO.From(x));
        }
    }
}
