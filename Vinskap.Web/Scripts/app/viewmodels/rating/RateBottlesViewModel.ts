/// <reference path="../search/BottleSearchViewModel.ts" />
/// <reference path="./RateBottleViewModel.ts" />

class RateBottlesViewModel extends ViewModel implements IContainer {

    Current: KnockoutObservable<ViewModel>;

    Search: BottleSearchViewModel;
    Rate: RateBottleViewModel;

    title = "Rate bottles";

    constructor() {
        super("rating/RateBottlesView");
        this.Search = new BottleSearchViewModel("api/bottles/unrated", this.onBottleSelected);
        this.Current = ko.observable(this.Search);
        this.Search.reload();
    }

    onBottleSelected = (bottle: RatedBottle) => {
        this.Rate = new RateBottleViewModel(bottle.Bottle, this.onBottleRated);
        this.Current(this.Rate);
    }

    onBottleRated = () => {
        this.Search.reload();
        this.Current(this.Search);
    }
}
