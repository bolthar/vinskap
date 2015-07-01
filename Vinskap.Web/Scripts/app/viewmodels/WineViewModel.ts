/// <reference path="./SearchViewModel.ts" />

class WineViewModel extends ViewModel {
    
    constructor() {
        super("WineView");
        this.Search = ko.observable(new SearchViewModel());
    }

    Search = ko.observable<SearchViewModel>();
} 