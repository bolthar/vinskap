using Vinskap.Domain;
using Vinskap.Functional;
using Vinskap.Services.Commands.Vaildation;
using Vinskap.WPF.Add.Views;
using System;
using System.Linq;

namespace Vinskap.WPF.Add.ViewModels
{
    public class PickOrCreateViewModel<T> : EditorViewModel<PickOrCreateView, T>, IEditor<T> 
    {
        private PickerViewModel<T> _pick;

        private IEditor<T> _create;

        private IEditor<T> _current;

        public PickOrCreateViewModel(PickOrCreateView view, PickerViewModel<T> pick, IEditor<T> create)
            : base(view)
        {
            _pick = pick;
            _create = create;
            _current = _pick;
            View.Create += this.OnCreate;
        }
                
        public IEditor<T> Current
        {
            get
            {
                return _current;
            }

            set
            {
                _current = value;
                Refresh();
            }
        }

        public Maybe<T> Commit()
        {
            return _current.Commit();
        }

        private void OnCreate(bool switchToCreate)
        {
            if(switchToCreate)
            {
                Current = _create;
            }
            else
            {
                Current = _pick;
            }
            Refresh();
        }

        public void Refresh()
        {
            Notify(() => Current);
            _create.Refresh();
            _pick.Refresh();
        }
    }
}
