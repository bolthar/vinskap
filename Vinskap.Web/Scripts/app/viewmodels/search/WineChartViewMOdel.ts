 /// <reference path="./BottleSearchViewModel.ts" />

class WineChartViewModel extends ViewModel {

    Search: BottleSearchViewModel;
    BottleDetail: CellarBottleViewModel;

    Current: KnockoutObservable<ViewModel>;

    title = "Bottle search";

    constructor() {
        super("search/WineChartView");
        this.Search = new BottleSearchViewModel("api/cellar/bottles", this.onBottleSelected);
        this.Current = ko.observable(this.Search);
        this.Search.reload();
    }

    onBottleSelected = (bottle: RatedBottle) => {
        Ajax.Get("api/cellar/placeFor?bottleId=" + bottle.Bottle.Guid,
            (d) => Place.fromJson(d),
            (places) => {
                this.BottleDetail = new CellarBottleViewModel(places[0], this.onBottleOpened);
                this.Current(this.BottleDetail);
            });
    }

    onBottleOpened = () => {
        this.Current(this.Search);
        this.Search.reload();
    }
}