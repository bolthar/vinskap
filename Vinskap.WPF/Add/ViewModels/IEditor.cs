using Vinskap.Functional;
using Vinskap.Services.Commands.Vaildation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vinskap.WPF.Add.ViewModels
{
    public interface IEditor<T>
    {
        Maybe<T> Commit();
        void Refresh();
    }
}
