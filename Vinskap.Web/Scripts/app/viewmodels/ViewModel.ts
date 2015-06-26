
class ViewModel {

    public View: string;

    constructor(viewName: string) {
        this.View = "/Scripts/app/views/" + viewName + ".html";
    }

    ViewFor = function (element: ViewModel) : string {
        return element.View;
    }
}