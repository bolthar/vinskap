
class SuggestionEntryViewModel extends ViewModel {

    wine: Wine;
    selected: KnockoutObservable<boolean>;
    entryClass: KnockoutComputed<string>;

    constructor(wine: Wine, isSelected: boolean) {
        super("SuggestionEntryView");
        this.wine = wine;
        this.selected = ko.observable<boolean>(isSelected);      
        this.entryClass = ko.pureComputed(() => {
            var classes = ["entry", this.wine.Kind.Type];
            if (!this.selected()) {
                classes.push("unselected");
            }
            return classes.join(" ");
        });  
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

} 