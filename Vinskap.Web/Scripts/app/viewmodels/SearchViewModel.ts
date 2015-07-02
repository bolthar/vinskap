/// <reference path="./SuggestionsViewModel.ts" />
/// <reference path="./SelectionViewModel.ts" />
/// <reference path="./WineSuggestionViewModel.ts" />

class SearchViewModel extends ViewModel {

    CurrentState: KnockoutObservable<ViewModel>;

    suggestions: SuggestionsViewModel<Wine>;
    selection: SelectionViewModel<Wine>;

    constructor() {
        super("SearchView");
        this.CurrentState = ko.observable<ViewModel>();
        this.setSuggestions();
    }

    OnSelected = (wine: Wine | string | any) => {
        if (wine instanceof Wine) {
            this.selection = new SelectionViewModel(wine, new WineSuggestionViewModel(wine), this.OnCleared);
            this.CurrentState(this.selection);
        } else if (typeof (wine) === "string") {
                        
        }        
    }

    OnCleared = () => {
        this.setSuggestions();
    }

    setSuggestions = () => {
        this.suggestions = new SuggestionsViewModel<Wine>(
            (searchTerm, callback) => {
                $.get("/api/wine?searchTerm=" + searchTerm,(data) => {
                    callback($.map(data,(i) => Wine.fromJson(i)));
                });
            },
            (e) => new WineSuggestionViewModel(e),
            (e) => this.OnSelected(e));
        this.CurrentState(this.suggestions);
    }
} 