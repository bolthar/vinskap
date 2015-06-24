using Vinskap.Services.Commands;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace Vinskap.WPF
{
    public abstract class ViewModel<TView> : INotifyPropertyChanged where TView : FrameworkElement
    {
        public TView View { get; private set; }

        protected ViewModel(TView view)
        {
            View = view;
            View.DataContext = this;
        }

        public event PropertyChangedEventHandler PropertyChanged;

        protected void Notify<T>(Expression<Func<T>> expr)
        {
            PropertyChanged.Notify(expr);
        }
    }
}
