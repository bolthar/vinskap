
class CellarDisplayViewModel extends ViewModel implements IContainer {

    detail: KnockoutObservable<ViewModel>;
    cellar: CellarViewModel;

    title = "Cellar";

    constructor() {
        super("cellar/CellarDisplayView");
        this.cellar = new CellarViewModel(this.onSelected, this.onHighlighted);
        this.detail = ko.observable(new EmptyPlaceViewModel());
    }

    onSelected = (selection: Place) => {
       
    }

    onHighlighted = (selection: Place) => {
        this.detail(new CurrentPlaceViewModel(selection));   
    }
} 