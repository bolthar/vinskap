
class SuggestionEntryViewModel extends ViewModel {

    wine: Wine;
    selected: KnockoutObservable<boolean>;
    entryClass: KnockoutComputed<string>;

    onChoose: (entry: Wine) => void;
    onSelect: (entry: SuggestionEntryViewModel) => void;

    constructor(wine: Wine, isSelected: boolean, onSelect: (entry: SuggestionEntryViewModel) => void, onChoose: (entry: Wine) => void) {
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
        this.onChoose = onChoose;
        this.onSelect = onSelect;
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

    Select = () => {
        this.onSelect(this);
    }

    Choose = () => {
        this.onChoose(this.wine);
    }
} 