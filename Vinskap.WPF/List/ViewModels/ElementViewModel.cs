using Vinskap.Domain;
using Vinskap.WPF.List.Views;
using System;
using System.Linq;

namespace Vinskap.WPF.List.ViewModels
{
    public class ElementViewModel : ViewModel<ElementView>
    {
        public Bottle Model { get; private set; }

        public ElementViewModel(ElementView view, Bottle model)
            : base(view)
        {
            Model = model;
        }

        public string Color
        {
            get
            {
                if (Model.Wine.Kind.Type == WineType.RED)
                    return "#FF0000";
                if (Model.Wine.Kind.Type == WineType.WHITE)
                    return "#FFFFFF";
                if (Model.Wine.Kind.Type == WineType.ROSEE)
                    return "#FFAAAA";
                return "Transparent";
            }
        }
        

    }
}
