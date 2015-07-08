/// <reference path="./AddBottleViewModel.ts" />

class ShellViewModel extends ViewModel {    

    constructor() {
        super("ShellView");
        this.Bottle(new AddBottleViewModel());
    }

    Bottle = ko.observable<AddBottleViewModel>();
}