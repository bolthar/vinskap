/// <reference path="./AddBottleViewModel.ts" />
/// <reference path="./search/BottleSearchViewModel.ts" />
/// <reference path="./Menu/MenuViewModel.ts" />

class ShellViewModel extends ViewModel {    

    constructor() {
        super("ShellView");
        //this.Bottle(new AddBottleViewModel());
        this.Search(new BottleSearchViewModel());
        this.Menu(new MenuViewModel());
    }

    //Bottle = ko.observable<AddBottleViewModel>();
    Search = ko.observable<BottleSearchViewModel>();
    Menu = ko.observable<MenuViewModel>();
}