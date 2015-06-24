using Vinskap.Domain;
using Vinskap.Functional;
using Vinskap.Services.Commands.Vaildation;
using Vinskap.Services.Repositories;
using Vinskap.WPF.Add.Views;
using System.Linq;

namespace Vinskap.WPF.Add.ViewModels
{
    public class WineEditViewModel : EditorViewModel<WineEditView, Wine>, IEditor<Wine>
    {
        public IEditor<Kind> KindPicker { get; private set; }
        public IEditor<Producer> ProducerPicker { get; private set; }

        private string _name;
        private double _alcohol;

        public WineEditViewModel(WineEditView view)
            : base(view)
        {
            var kinds = CellarRepository.Instance.Get<Kind>();
            if(kinds.Count() > 0)
            {
                KindPicker = new PickOrCreateViewModel<Kind>(new PickOrCreateView(), 
                    new PickerViewModel<Kind>(new PickerView(), kinds, k => k.Name), 
                    new KindEditViewModel(new KindEditView()));
            }
            else
            {
                KindPicker = new KindEditViewModel(new KindEditView());
            }

            var producers = CellarRepository.Instance.Get<Producer>();
            if(producers.Count() > 0)
            {
                ProducerPicker = new PickOrCreateViewModel<Producer>(new PickOrCreateView(),
                    new PickerViewModel<Producer>(new PickerView(), producers, p => p.Name), 
                    new ProducerEditViewModel(new ProducerEditView()));
            }
            else
            {
                ProducerPicker = new ProducerEditViewModel(new ProducerEditView());
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

        public double Alcohol
        {
            get { return _alcohol; }
            set
            {
                _alcohol = value;                
            }
        }

        public override IValidator<Wine> Validator
        {
            get 
            { 
                return new ValidateWine(Name, KindPicker.Commit(), ProducerPicker.Commit(), Alcohol);                
            }
        }

        public Maybe<Wine> Commit()
        {
            return Validator.Commit();            
        }

        public void Refresh()
        {
            Notify(() => Name);
            KindPicker.Refresh();
            ProducerPicker.Refresh();
            Notify(() => Alcohol);
        }
    }
}
