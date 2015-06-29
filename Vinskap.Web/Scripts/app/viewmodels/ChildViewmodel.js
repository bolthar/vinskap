/// <reference path="./AlphaViewmodel.ts" />
/// <reference path="./BetaViewmodel.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ChildViewModel = (function (_super) {
    __extends(ChildViewModel, _super);
    function ChildViewModel(value) {
        _super.call(this, "ChildView");
        this.OnClicked = function () {
            if (this.Current() == this.alpha) {
                this.Current(this.beta);
            }
            else {
                this.Current(this.alpha);
            }
        };
        this.Current = ko.observable();
        this.DisplayValue = ko.observable(value);
        this.alpha = new AlphaViewModel();
        this.beta = new BetaViewModel();
        this.Current(this.alpha);
    }
    return ChildViewModel;
})(ViewModel);
//# sourceMappingURL=ChildViewmodel.js.map