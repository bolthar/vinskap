/// <reference path="./SuggestionsViewModel.ts" />
/// <reference path="./SelectionViewModel.ts" />
/// <reference path="./WineSuggestionViewModel.ts" />

class SearchViewModel extends ViewModel {

    CurrentState: KnockoutObservable<ViewModel>;

    suggestions: SuggestionsViewModel<Wine>;
    selection: SelectionViewModel<Wine>;

    constructor() {
        super("SearchView");
        this.suggestions = new SuggestionsViewModel<Wine>(
            (searchTerm, callback) => {
                $.get("/api/wine?searchTerm=" + searchTerm, (data) => {
                    $.each(data,(i) => callback(new Wine(data[i])))
                });
            },
            (e) => new WineSuggestionViewModel(e),
            (e) => this.OnSelected(e));

        this.CurrentState = ko.observable(this.suggestions);               
    }

    OnSelected = (wine: Wine) => {
        this.selection = new SelectionViewModel(wine, new WineSuggestionViewModel(wine), this.OnCleared);
        this.CurrentState(this.selection);
    }

    OnCleared = () => {
        this.CurrentState(this.suggestions);
    }
} 