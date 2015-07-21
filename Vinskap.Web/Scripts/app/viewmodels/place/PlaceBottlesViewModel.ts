/// <reference path="../search/BottleSearchViewModel.ts" />
/// <reference path="./PlaceSelectorViewModel.ts" />

class PlaceBottlesViewModel extends ViewModel {

    Current: KnockoutObservable<ViewModel>;

    Search: BottleSearchViewModel;
    Cellar: PlaceSelectorViewModel;
    
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
        this.Current(this.Search);
    }
} 