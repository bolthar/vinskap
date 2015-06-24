using Vinskap.Services.Commands.Vaildation;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace Vinskap.WPF.Add.ViewModels
{
    public abstract class EditorViewModel<TView, U> : ViewModel<TView>, IDataErrorInfo where TView : FrameworkElement
    {
        protected EditorViewModel(TView view) : base(view)
        {

        }

        public virtual IValidator<U> Validator
        {
            get
            {
                return new NoOpValidator<U>();
            }
        }

        public string Error
        {
            get
            {
                return null;
            }
        }

        public string this[string columnName]
        {
            get
            {
                var errors = Validator.Errors;
                if (errors.Any(x => x.Field == columnName))
                {
                    return errors
                        .Where(x => x.Field == columnName)
                        .Select(x => x.Message)
                        .Aggregate((x1, x2) => x1 + "," + x2);
                }

                return null;
            }
        }
    }
}
