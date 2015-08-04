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
    public class RatingController : ApiController
    {
        [Route("api/bottle/rate")]
        [HttpPost]
        public void Open(RatingDTO rating)
        {
            ExecutionContext.Instance.Execute(new RateBottle(rating.Bottle.To(), rating.Score));
        }
    }
}
