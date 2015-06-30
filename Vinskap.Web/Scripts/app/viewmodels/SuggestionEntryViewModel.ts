
class SuggestionEntryViewModel extends ViewModel {

    wine: Wine;
    selected: KnockoutObservable<boolean>;
    entryClass: KnockoutComputed<string>;

    constructor(wine: Wine) {
        super("SuggestionEntryView");
        this.wine = wine;
        this.selected = ko.observable<boolean>(false);      
        this.entryClass = ko.computed(() => {
            var classes = ["entry", this.wine.Kind.Type];
            if (!this.selected) {
                classes.push("unselected");
            }
            return classes.join(" ");
        });  
    }   
} 