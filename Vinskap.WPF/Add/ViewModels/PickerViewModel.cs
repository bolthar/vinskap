using Vinskap.Functional;
using Vinskap.WPF.Add.Views;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace Vinskap.WPF.Add.ViewModels
{
    public class PickerViewModel<T> : ViewModel<PickerView>, IEditor<T>, IDataErrorInfo
    {
        public class ComboBoxItem<U>
        {
            internal U Item { get; private set; }

            private string _name;

            public ComboBoxItem(U item, string name)
            {
                Item = item;
                _name = name;
            }

            public override string ToString()
            {
                return _name;
            }
        }

        private ComboBoxItem<T> _selectedItem;

        private IEnumerable<ComboBoxItem<T>> _items;

        public PickerViewModel(PickerView view, IEnumerable<T> model, Func<T, string> descriptionFunc)
            : base(view)
        {
            _items = model.Select(x => new ComboBoxItem<T>(x, descriptionFunc(x)));
        }

        public ComboBoxItem<T> SelectedItem
        {
            get
            {
                return _selectedItem;
            }

            set
            {
                _selectedItem = value;
                Refresh();
            }
        }

        public IEnumerable<ComboBoxItem<T>> Items
        {
            get
            {
                return _items;
            }
        }

        public Maybe<T> Commit()
        {
            return _selectedItem.ToMaybe().Bind(x => x.Item.ToMaybe());
        }

        public string Error
        {
            get { return null; }
        }

        public string this[string columnName]
        {
            get
            {
                if (columnName == "SelectedItem" && SelectedItem == null)
                {
                    return "Please select an item";
                }

                return null;
            }
        }

        public void Refresh()
        {
            Notify(() => SelectedItem);
        }
    }
}
