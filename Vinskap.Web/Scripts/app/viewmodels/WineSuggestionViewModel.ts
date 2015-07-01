 
class WineSuggestionViewModel extends ViewModel {

    wine: Wine;

    constructor(wine: Wine) {
        super("WineSuggestionView");
        this.wine = wine;
    }

    Title = function (): string {
        if (this.wine.Name != "") {
            return this.wine.Name;
        }

        return this.wine.Kind.Name;
    }

    FirstDetail = function (): string {
        if (this.wine.Name != "") {
            return this.wine.Kind.Name
        }
    }

    SecondDetail = function (): string {
        return this.wine.Producer.Name;
    }

    EntryClass = function (): string {
        return "entry " + this.wine.Kind.Type;
    }
}