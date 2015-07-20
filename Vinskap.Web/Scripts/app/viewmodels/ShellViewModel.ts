/// <reference path="./Menu/MenuViewModel.ts" />

class ShellViewModel extends ViewModel {    

    constructor() {
        super("ShellView");
        this.Menu(new MenuViewModel(this.changeContainer));
    }

    Container = ko.observable<ViewModel>();
    Menu = ko.observable<MenuViewModel>();

    changeContainer = (viewModel: ViewModel) => {
        this.Container(viewModel);
    }
}