var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BetaViewModel = (function (_super) {
    __extends(BetaViewModel, _super);
    function BetaViewModel() {
        _super.call(this, "BetaView");
        this.Suggestions = function (searchTerm, callback) {
            setTimeout(function () {
                callback(['a', 'b', 'c', 'aaaa', 'bbb', 'abc', 'ababa', 'test', 'test2']);
            }, 500);
        };
    }
    return BetaViewModel;
})(ViewModel);
//# sourceMappingURL=BetaViewModel.js.map