/// <reference path="../search/BottleSearchViewModel.ts" />

class PlaceBottlesViewModel extends ViewModel {

    Search: BottleSearchViewModel;
    
    constructor() {
        super("place/PlaceBottlesView");
        this.Search = new BottleSearchViewModel("api/bottles/unplaced", this.onBottleSelected);
    }

    onBottleSelected = (bottle: Bottle) => {

    }
} 