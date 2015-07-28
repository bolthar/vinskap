/// <reference path="./IContainer.ts" />
/// <reference path="./Menu/MenuViewModel.ts" />

class ShellViewModel extends ViewModel {    

    constructor() {
        super("ShellView");
        this.Menu(new MenuViewModel(this.changeContainer));        
        
    }

    averageRating = () => {
        return 2;
    }

    Container = ko.observable<IContainer>();
    Menu = ko.observable<MenuViewModel>();

    changeContainer = (viewModel: IContainer) => {
        this.Container(viewModel);
    }
}