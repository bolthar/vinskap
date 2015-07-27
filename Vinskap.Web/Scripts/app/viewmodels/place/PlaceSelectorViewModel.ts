/// <reference path="../cellar/CellarViewModel.ts" />
/// <reference path="../display/BottleDisplayViewModel.ts" />
/// <reference path="./EmptyPlaceViewModel.ts" />
/// <reference path="./CurrentPlaceViewModel.ts" />

class PlaceSelectorViewModel extends ViewModel {

    detail: KnockoutObservable<ViewModel>;
    cellar: CellarViewModel;
    selectedBottle: BottleDisplayViewModel;

    place: KnockoutObservable<Place>;
    hasNoPlace: KnockoutComputed<boolean>;

    constructor(private bottle: Bottle, private onBottlePlaced: () => void) {
        super("place/PlaceSelectorView");
        this.selectedBottle = new BottleDisplayViewModel(bottle);
        this.cellar = new CellarViewModel(this.onSelected, this.onHighlighted);
        this.detail = ko.observable(new EmptyPlaceViewModel());
        this.place = ko.observable(null);
        this.hasNoPlace = ko.pureComputed(() => this.place() == null);
    }

    onSelected = (selection: Place) => {
        this.cellar.setSelection(selection);
        this.detail(new CurrentPlaceViewModel(selection));    
        this.place(selection);
    }

    onHighlighted = (selection: Place) => {  
        if (this.place() == null) {
            this.detail(new CurrentPlaceViewModel(selection));
        }
    }

    placeBottle = () => {
        var newPlace = new Place(this.place().Row, this.place().Column, this.place().Aisle, this.bottle);
        Ajax.Post("api/cellar/place", newPlace, (r) => r, (r) => this.onBottlePlaced());        
    }

} 