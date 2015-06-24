using Vinskap.WPF.Shell.ViewModels;
using Vinskap.WPF.Shell.Views;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;

namespace Vinskap.WPF
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            new ShellViewModel(new ShellView()).View.Show();
        }
    }
}
