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

    OnKeyDown = (d, e) => {
        if (e.keyCode == 38) {
            this.Suggestions().MoveUp();
            return false;
        }

        if (e.keyCode == 40) {
            this.Suggestions().MoveDown();
            return false;
        }

        if (e.keyCode == 13) {
            this.Suggestions().Choose();
            return false;
        }

        return true;
    };

} 