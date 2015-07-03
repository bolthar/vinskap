/// <reference path="./BottleEditorViewModel.ts" />

class ShellViewModel extends ViewModel {    

    constructor() {
        super("ShellView");
        this.Bottle(new BottleEditorViewModel());
    }

    Bottle = ko.observable<BottleEditorViewModel>();
}