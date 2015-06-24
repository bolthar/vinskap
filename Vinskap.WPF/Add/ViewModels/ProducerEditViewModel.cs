using Vinskap.Domain;
using Vinskap.Functional;
using Vinskap.Services.Commands.Vaildation;
using Vinskap.WPF.Add.Views;

namespace Vinskap.WPF.Add.ViewModels
{
    public class ProducerEditViewModel : EditorViewModel<ProducerEditView, Producer>, IEditor<Producer>
    {
        private string _name;

        public ProducerEditViewModel(ProducerEditView view)
            : base(view)
        {
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

        public Maybe<Producer> Commit()
        {
            return Validator.Commit();
        }

        public override IValidator<Producer> Validator
        {
            get
            {
                return new ValidateProducer(Name);
            }
        }

        public void Refresh()
        {
            Notify(() => Name);
        }
    }
}
