/// <reference path="./SuggestionEntryViewModel.ts" />
/// <reference path="../domain/Wine.ts" />

class SuggestionsViewModel extends ViewModel {

    Entries = ko.observableArray<SuggestionEntryViewModel>();

    constructor() {
        super("SuggestionsView");
    }

    SearchFor = function (searchTerm: string): void {
        this.Entries.removeAll();
        if (searchTerm.length > 1) {
            $.get("/api/wine?searchTerm=" + searchTerm,(data) => {
                $.each(data,(i) => this.Entries.push(new SuggestionEntryViewModel(new Wine(data[i]), i == 0)));
            });
        }
    }
} 
