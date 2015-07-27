/// <reference path="../search/BottleSearchViewModel.ts" />
/// <reference path="./PlaceSelectorViewModel.ts" />

class PlaceBottlesViewModel extends ViewModel implements IContainer {

    Current: KnockoutObservable<ViewModel>;

    Search: BottleSearchViewModel;
    Cellar: PlaceSelectorViewModel;

    title = "Place bottle";
    
    constructor() {
        super("place/PlaceBottlesView");
        this.Search = new BottleSearchViewModel("api/bottles/unplaced", this.onBottleSelected);        
        this.Current = ko.observable(this.Search);
    }

    onBottleSelected = (bottle: Bottle) => {        
        this.Cellar = new PlaceSelectorViewModel(bottle, this.onBottlePlaced);
        this.Current(this.Cellar);
    }

    onBottlePlaced = () => {
        this.Search.reload();
        this.Current(this.Search);
    }
} 