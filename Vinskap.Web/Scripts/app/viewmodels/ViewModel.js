var ViewModel = (function () {
    function ViewModel(viewName) {
        var _this = this;
        this.ViewFor = function (element) {
            return element.View();
        };
        this.ViewName = ko.observable(viewName);
        this.View = ko.computed(function () { return "/Scripts/app/views/" + _this.ViewName() + ".html"; });
    }
    return ViewModel;
})();
//# sourceMappingURL=ViewModel.js.map