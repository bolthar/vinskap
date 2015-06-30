/// <reference path="./WineViewModel.ts" />

class ShellViewModel extends ViewModel {    

    constructor() {
        super("ShellView");
        this.Wine(new WineViewModel());
    }

    Wine = ko.observable<WineViewModel>();
}