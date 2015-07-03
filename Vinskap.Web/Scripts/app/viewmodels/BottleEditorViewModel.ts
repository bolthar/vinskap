/// <reference path="./SearchViewModel.ts" />

class BottleEditorViewModel extends ViewModel {
    
    year: NumericEditorViewModel;
    price: NumericEditorViewModel;

    constructor() {
        super("BottleEditorView");
        this.Wine = ko.observable(new SearchViewModel<Wine>(
            (searchTerm, callback) => {
                $.get("/api/wine?searchTerm=" + searchTerm,(data) => {
                    callback($.map(data,(i) => Wine.fromJson(i)));
                });
            },
            (e) => new WineSuggestionViewModel(e),
            (st) => new WineEditorViewModel(st)
        ));        
        this.year = new NumericEditorViewModel("Year", 2012, 1);
        this.price = new NumericEditorViewModel("Price", 5, 0.1, 2, "€");
    }


    Wine = ko.observable<SearchViewModel<Wine>>();
} 