/// <reference path="./SuggestionsViewModel.ts" />
/// <reference path="./WineSuggestionViewModel.ts" />

class WineViewModel extends ViewModel {

    searchTerm: KnockoutObservable<string>

    constructor() {
        super("WineView");
        this.searchTerm = ko.observable("")
        this.searchTerm.extend({ rateLimit: 500 });
        this.searchTerm.subscribe((value) => {
            this.OnValueChanged(value);
        });
        this.Suggestions(new SuggestionsViewModel<Wine>(
            (searchTerm, callback) => {
                $.get("/api/wine?searchTerm=" + searchTerm,(data) => {
                    $.each(data,(i) => callback(new Wine(data[i])))
                });
            },
            (e) => new WineSuggestionViewModel(e),
            (e) => alert(e.Name))
        );            
    }

    OnValueChanged = function (value: string): void {
        this.Suggestions().SearchFor(value);
    };

    Suggestions = ko.observable<SuggestionsViewModel<Wine>>();

    OnKeyDown = (d, e) => {
        if (e.keyCode == 38) {
            this.Suggestions().MoveUp();
            return false;
        }

        if (e.keyCode == 40) {
            this.Suggestions().MoveDown();
            return false;
        }

        if (e.keyCode == 13 || e.keyCode == 9) {
            this.Suggestions().Choose();
            return false;
        }

        return true;
    };

} 