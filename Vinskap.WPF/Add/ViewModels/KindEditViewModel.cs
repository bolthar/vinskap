using Vinskap.Domain;
using Vinskap.Functional;
using Vinskap.Services.Commands.Vaildation;
using Vinskap.WPF.Add.Views;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Vinskap.WPF.Add.ViewModels
{
    public class KindEditViewModel : EditorViewModel<KindEditView, Kind>, IEditor<Kind>
    {
        private WineType _wineType;

        private string _name;

        public KindEditViewModel(KindEditView view)
            : base(view)
        {

        }

        public WineType SelectedWineType
        {
            get { return _wineType; }
            set
            {
                _wineType = value;
                Refresh();
            }
        }

        public string Name
        {
            get { return _name; }
            set
            {
                _name = value;
                Refresh();
            }
        }

        public IEnumerable<WineType> WineTypes
        {
            get
            {
                return Enum.GetValues(typeof(WineType))
                    .Cast<WineType>();
            }
        }

        public Maybe<Kind> Commit()
        {
            return Validator.Commit();
        }

        public override IValidator<Kind> Validator
        {
            get
            {
                return new ValidateKind(Name, SelectedWineType);
            }
        }

        public void Refresh()
        {            
            Notify(() => Name);
            Notify(() => SelectedWineType);
        }
    }
}
