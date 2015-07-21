using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using Vinskap.Web.App_Start;
using System.Web.Optimization;
using Vinskap.Services.Repositories;
using Vinskap.Services.Events;
namespace Vinskap.Web
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {            
            // Code that runs on application startup
            EventLog.Setup(System.Configuration.ConfigurationManager.ConnectionStrings["default"].ConnectionString);
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}