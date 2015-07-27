/// <reference path="../AddBottleViewModel.ts" />
/// <reference path="../place/PlaceBottlesViewModel.ts" />
/// <reference path="../search/WineChartViewModel.ts" />
/// <reference path="../cellar/CellarDisplayViewModel.ts" />

class MenuViewModel extends ViewModel {

    constructor(private onSectionChanged: (viewModel: IContainer) => void) {
        super("menu/MenuView");
        this.showCellar();
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

    showCellar = () => {
        this.onSectionChanged(new CellarDisplayViewModel());
    }
} 