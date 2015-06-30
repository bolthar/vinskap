/// <reference path="./SuggestionEntryViewModel.ts" />
/// <reference path="../domain/Wine.ts" />

class SuggestionsViewModel extends ViewModel {

    Entries = ko.observableArray<SuggestionEntryViewModel>();

    constructor() {
        super("SuggestionsView");
    }

    SearchFor = function (searchTerm: string): void {
        $.get("/api/wine?" + searchTerm,(data) => {
            var newEntries = $.map(data,(x) => new SuggestionEntryViewModel(new Wine(x)));
            this.Entries.clear();
            this.Entries(newEntries);
        });
    }
} 
