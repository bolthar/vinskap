/// <reference path="./BottleListItemViewModel.ts" />
/// <reference path="../display/BottleDisplayViewModel.ts" />

class BottleListViewModel extends ViewModel {

    Bottles = ko.observableArray<BottleListItemViewModel>();

    constructor() {
        super("search/BottleListView");
    }

    UpdateWith = (bottles: Array<Bottle>) => {
        this.Bottles.removeAll();
        $.each(bottles, (i, b) => {
            this.Bottles.push(new BottleListItemViewModel(new BottleDisplayViewModel(b)));
        });     
    }
} 