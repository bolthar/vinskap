 /// <reference path="./BottleSearchViewModel.ts" />

class WineChartViewModel extends ViewModel {

    Search: BottleSearchViewModel;

    title = "Bottle search";

    constructor() {
        super("search/WineChartView");
        this.Search = new BottleSearchViewModel("api/cellar/bottles", this.onBottleSelected)
    }

    onBottleSelected = (bottle: Bottle) => {
    }
}