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
        this.year = new NumericEditorViewModel(2012, 1);
        this.price = new NumericEditorViewModel(5, 0.1);
    }


    Wine = ko.observable<SearchViewModel<Wine>>();
} 