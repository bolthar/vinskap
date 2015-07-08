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

namespace Vinskap.Web.Controllers
{
    public class BottleController : ApiController
    {
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
