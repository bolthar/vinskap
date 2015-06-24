using Vinskap.Domain;
using Vinskap.WPF.List.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.WPF.List.ViewModels
{
    public class ListViewModel : ViewModel<ListView>
    {
        public ElementsViewModel Elements { get; private set; }
        public SearchViewModel Search { get; private set; }

        public ListViewModel(ListView view)
            : base(view)
        {
            Elements = new ElementsViewModel(new ElementsView(), new List<Bottle>());            
        }
    }
}
