using Vinskap.Domain;
using Vinskap.WPF.List.Views;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Vinskap.WPF.List.ViewModels
{
    public class ElementsViewModel : ViewModel<ElementsView>
    {
        public IEnumerable<ElementViewModel> Elements { get; private set; }

        public ElementsViewModel(ElementsView view, IEnumerable<Bottle> model)
            : base(view)
        {
            this.Elements = model.Select(x => new ElementViewModel(new ElementView(), x));
        }
    }
}
