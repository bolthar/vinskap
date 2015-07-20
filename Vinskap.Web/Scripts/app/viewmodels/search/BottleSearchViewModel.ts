﻿/// <reference path="./BottleFilterViewModel.ts" />
/// <reference path="./BottleListViewModel.ts" />

class BottleSearchViewModel extends ViewModel {

    Filter: KnockoutObservable<BottleFilterViewModel>;
    List: KnockoutObservable<BottleListViewModel>;

    constructor(private searchTarget: string, private onBottleSelected: (bottle: Bottle) => void) {
        super("search/BottleSearchView");        
        this.Filter = ko.observable(new BottleFilterViewModel(this.onSearchChanged));
        this.List = ko.observable(new BottleListViewModel(this.onBottleSelected));
    }

    onSearchChanged = (searchTerm: string, sortOption: string) => {        
        Ajax.Get(this.searchTarget + "?searchTerm=" + searchTerm + "&sortOption=" + sortOption,
            (d) => Bottle.fromJson(d),
            (bottles) => this.List().UpdateWith(bottles));
    }
}
