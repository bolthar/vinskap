
class ViewModel {

    View: KnockoutComputed<string>;
    ViewName: KnockoutObservable<string>;

    constructor(viewName: string) {
        this.ViewName = ko.observable(viewName);
        this.View = ko.computed(() => "/Scripts/app/views/" + this.ViewName() + ".html");
    }

    ViewFor = (element: ViewModel) => {
        return element.View();
    }
}