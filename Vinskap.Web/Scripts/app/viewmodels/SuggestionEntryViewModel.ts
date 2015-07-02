
class SuggestionEntryViewModel<T> extends ViewModel {

    entity: T;
    selected: KnockoutObservable<boolean>;
    entryClass: KnockoutComputed<string>;

    viewModel: ViewModel;
    onChoose: () => void;
    onSelect: (entry: SuggestionEntryViewModel<T>) => void;

    constructor(viewModel: ViewModel, isSelected: boolean, onSelect: (entry: SuggestionEntryViewModel<T>) => void, onChoose: () => void) {
        super("SuggestionEntryView");
        this.viewModel = viewModel;
        this.selected = ko.observable<boolean>(isSelected);      
        this.entryClass = ko.pureComputed(() => {
            var classes = [];
            if (!this.selected()) {
                classes.push("unselected");
            }
            return classes.join(" ");
        });  
        this.onChoose = onChoose;
        this.onSelect = onSelect;        
    }

    Select = () => {
        this.onSelect(this);
    }

    Choose = () => {
        this.onChoose();
    }
} 