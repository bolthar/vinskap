using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace Vinskap.Web.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/lib/jquery/jquery-2.1.4.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                        "~/Scripts/lib/knockout/knockout-3.3.0.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/lib/bootstrap/bootstrap.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include("~/Scripts/app/app.js"));

            bundles.Add(new StyleBundle("~/Content/bootstrap").Include("~/Content/Stylesheets/bootstrap/bootstrap.min.css"));            
            bundles.Add(new StyleBundle("~/Content/app").Include("~/Content/Stylesheets/app.less"));
        }
    }
}