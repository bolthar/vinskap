/// <reference path="./ChildViewmodel.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShellViewModel = (function (_super) {
    __extends(ShellViewModel, _super);
    function ShellViewModel() {
        _super.call(this, "ShellView");
        this.value = ko.observable("test");
        this.Children = ko.observableArray();
        this.Current = ko.observable();
        this.Children.push(new ChildViewModel("la"));
        this.Children.push(new ChildViewModel("le"));
        this.Children.push(new ChildViewModel("li"));
    }
    return ShellViewModel;
})(ViewModel);
//# sourceMappingURL=ShellViewmodel.js.map