/// <reference path="../AddBottleViewModel.ts" />
/// <reference path="../place/PlaceBottlesViewModel.ts" />
/// <reference path="../search/WineChartViewModel.ts" />

class MenuViewModel extends ViewModel {

    constructor(private onSectionChanged: (viewModel : ViewModel) => void) {
        super("Menu/MenuView");
    }

    addNewBottle = () => {
        this.onSectionChanged(new AddBottleViewModel());
    }

    placeBottles = () => {
        this.onSectionChanged(new PlaceBottlesViewModel());
    }

    showList = () => {
        this.onSectionChanged(new WineChartViewModel());
    }
} 