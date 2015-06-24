using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
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
    /// Interaction logic for PickOrCreateView.xaml
    /// </summary>
    public partial class PickOrCreateView : UserControl
    {
        public event Action<bool> Create;

        public PickOrCreateView()
        {
            InitializeComponent();
        }

        private void ToggleButton_Click(object sender, RoutedEventArgs e)
        {
            this.Create((sender as ToggleButton).IsChecked.Value);
        }
    }
}
