using Vinskap.Services.Commands;
using Vinskap.Functional;
using Vinskap.WPF.Add.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vinskap.Services;

namespace Vinskap.WPF.Add.ViewModels
{
    public class AddBottleViewModel : ViewModel<AddBottleView>
    {
        public BottleEditViewModel Editor { get; private set; }

        public AddBottleViewModel(AddBottleView view) : base(view)
        {
            View.OK += View_OK;
            View.Cancel += View_Cancel;
            Editor = new BottleEditViewModel(new BottleEditView());
        }

        void View_Cancel()
        {
            Editor = new BottleEditViewModel(new BottleEditView());            
            Notify(() => Editor);
            Editor.Refresh();
        }

        void View_OK()
        {
            Editor.Commit().Bind(x => ExecutionContext.Instance.Execute(new CreateBottle(x)).Bind(y => View_Cancel()));
        }
    }
}
