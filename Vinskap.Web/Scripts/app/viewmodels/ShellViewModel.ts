/// <reference path="./ChildViewmodel.ts" />

class ShellViewModel extends ViewModel {    

    constructor() {
        super("ShellView");
        this.Children.push(new ChildViewModel("la"));
        this.Children.push(new ChildViewModel("le"));
        this.Children.push(new ChildViewModel("li"));
    }

    value = ko.observable("test");

    Children = ko.observableArray<ChildViewModel>();

    Current = ko.observable<ViewModel>();
}