/// <reference path="./SuggestionsViewModel.ts" />

class WineViewModel extends ViewModel {

    searchTerm: KnockoutObservable<string>

    constructor() {
        super("WineView");
        this.searchTerm = ko.observable("")
        this.searchTerm.extend({ rateLimit: 500 });
        this.searchTerm.subscribe((value) => {
            this.OnValueChanged(value);
        });
        this.Suggestions(new SuggestionsViewModel());
    }

    OnValueChanged = function (value: string): void {
        this.Suggestions().SearchFor(value);
    };

    Suggestions = ko.observable<SuggestionsViewModel>();

    
} 