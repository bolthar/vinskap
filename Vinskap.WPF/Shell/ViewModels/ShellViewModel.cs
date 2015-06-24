using Vinskap.WPF.Add.ViewModels;
using Vinskap.WPF.Add.Views;
using Vinskap.WPF.List.ViewModels;
using Vinskap.WPF.List.Views;
using Vinskap.WPF.Shell.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.WPF.Shell.ViewModels
{
    public class ShellViewModel : ViewModel<ShellView>
    {
        private ListViewModel _list;
        private AddBottleViewModel _add;

        public object Current { get; private set; }

        public ShellViewModel(ShellView view) : base(view)
        {
            _list = new ListViewModel(new ListView());
            _add = new AddBottleViewModel(new AddBottleView());
            Current = _add;
        }
    }
}
