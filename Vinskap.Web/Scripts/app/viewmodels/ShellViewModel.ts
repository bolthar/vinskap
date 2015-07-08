/// <reference path="./AddBottleViewModel.ts" />
/// <reference path="./Menu/MenuViewModel.ts" />

class ShellViewModel extends ViewModel {    

    constructor() {
        super("ShellView");
        this.Bottle(new AddBottleViewModel());
        this.Menu(new MenuViewModel());
    }

    Bottle = ko.observable<AddBottleViewModel>();
    Menu = ko.observable<MenuViewModel>();
}