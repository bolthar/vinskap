/// <reference path="./BottleListItemViewModel.ts" />
/// <reference path="../display/RatedBottleDisplayViewModel.ts" />

class BottleListViewModel extends ViewModel {

    Bottles = ko.observableArray<BottleListItemViewModel>();

    constructor(private onBottleSelected: (bottle: RatedBottle) => void) {
        super("search/BottleListView");
    }

    UpdateWith = (bottles: Array<RatedBottle>) => {
        this.Bottles.removeAll();
        $.each(bottles, (i, b) => {
            this.Bottles.push(new BottleListItemViewModel(b, this.onBottleSelected));
        });     
    }
} 