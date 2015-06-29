var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AlphaViewModel = (function (_super) {
    __extends(AlphaViewModel, _super);
    function AlphaViewModel() {
        _super.call(this, "AlphaView");
        this.Load = function () {
            var _this = this;
            this.ViewName("LoadingView");
            setTimeout(function () {
                _this.ViewName("AlphaView");
                _this.myvalue("loaded");
            }, 5000);
        };
        this.OnClicked = function () {
            this.Load();
        };
        this.myvalue = ko.observable("none");
    }
    return AlphaViewModel;
})(ViewModel);
//# sourceMappingURL=AlphaViewModel.js.map