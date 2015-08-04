/// <reference path="./CellarBottleViewModel.ts" />

class CellarDisplayViewModel extends ViewModel implements IContainer {

    detail: KnockoutObservable<ViewModel>;
    cellar: CellarViewModel;
    bottleDetail: CellarBottleViewModel;

    Current: KnockoutObservable<ViewModel>;

    title = "Cellar";

    constructor() {
        super("cellar/CellarDisplayView");
        this.cellar = new CellarViewModel(this.onSelected, this.onHighlighted);        
        this.detail = ko.observable(new EmptyPlaceViewModel());
        this.Current = ko.observable(this.cellar);
    }

    onSelected = (selection: Place) => {
        if (selection.Bottle != null) {
            this.bottleDetail = new CellarBottleViewModel(selection, this.onBottleOpened);
            this.Current(this.bottleDetail);
        }
    }

    onHighlighted = (selection: Place) => {
        this.detail(new CurrentPlaceViewModel(selection));   
    }

    onBottleOpened = () => {
        this.cellar = new CellarViewModel(this.onSelected, this.onHighlighted);
        this.Current(this.cellar);
    }
} 