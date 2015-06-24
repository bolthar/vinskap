using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Vinskap.WPF.Add.Views
{
    /// <summary>
    /// Interaction logic for AddBottleView.xaml
    /// </summary>
    public partial class AddBottleView : UserControl
    {
        public event Action OK;
        public event Action Cancel;

        public AddBottleView()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            Cancel();
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            OK();
        }
    }
}
