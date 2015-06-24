using Vinskap.Domain;
using Vinskap.Functional;
using Vinskap.Services.Commands.Vaildation;
using Vinskap.Services.Repositories;
using Vinskap.WPF.Add.Views;
using System.Linq;

namespace Vinskap.WPF.Add.ViewModels
{
    public class BottleEditViewModel : EditorViewModel<BottleEditView, Bottle>, IEditor<Bottle>
    {
        public IEditor<Wine> WinePicker { get; private set; }

        private int _year;
        private double? _price;

        public BottleEditViewModel(BottleEditView view)
            : base(view)
        {
            var wines = CellarRepository.Instance.Get<Wine>();
            if(wines.Count() > 0)
            {
                WinePicker = new PickOrCreateViewModel<Wine>(new PickOrCreateView(), new PickerViewModel<Wine>(new PickerView(), wines, w => w.Name), new WineEditViewModel(new WineEditView()));
            }
            else
            {
                WinePicker = new WineEditViewModel(new WineEditView());
            }
        }

        public int Year
        {
            get { return _year; }
            set
            {
                _year = value;
                Refresh();
            }
        }

        public double? Price
        {
            get { return _price; }
            set
            {
                _price = value;
                Refresh();
            }
        }

        public override IValidator<Bottle> Validator
        {
            get
            {
                return new ValidateBottle(WinePicker.Commit(), Year, Price);
            }
        }

        public Maybe<Bottle> Commit()
        {
            return Validator.Commit();
        }

        public void Refresh()
        {
            WinePicker.Refresh();
            Notify(() => Year);
            Notify(() => Price);
        }
    }
}
