using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
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
    }
}
