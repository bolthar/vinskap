/// <reference path="../place/CurrentPlaceViewModel.ts" />
/// <reference path="../detail/BottleDetailViewModel.ts" />

/// <reference path="../detail/BottleDetailViewModel.ts" />
/// <reference path="../place/CurrentPlaceViewModel.ts" />

class CellarBottleViewModel extends ViewModel {

    detail: BottleDetailViewModel;
    placeInfo: CurrentPlaceViewModel;

    constructor(private place: Place, private onBottleOpened: () => void) {
        super("cellar/CellarBottleView");
        this.detail = new BottleDetailViewModel(this.place.Bottle.Bottle);    
        this.placeInfo = new CurrentPlaceViewModel(this.place);
    }

    onOpen = () => {
        Ajax.Post("api/bottle/open", this.place.Bottle.Bottle, (r) => r, (data) => this.onBottleOpened());
    }
} 