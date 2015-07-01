/// <reference path="./SuggestionEntryViewModel.ts" />
/// <reference path="../domain/Wine.ts" />

class SuggestionsViewModel<T> extends ViewModel {

    Entries = ko.observableArray<SuggestionEntryViewModel<T>>();
    factory: (entity: T) => ViewModel;
    source: (searchTerm: string, onNewItem: (data: T) => void) => void;
    onChoice: (entry: T) => void;

    constructor(source: (searchTerm: string, onNewItem: (data: T) => void) => void, factory: (entity: T) => ViewModel, onChoice: (entry: T) => void) {
        super("SuggestionsView");
        this.factory = factory;
        this.source = source;
        this.onChoice = onChoice;
    }

    SearchFor = (searchTerm: string) => {
        this.Entries.removeAll();
        if (searchTerm.length > 1) {
            this.source(searchTerm,(data) => {
                this.Entries.push(new SuggestionEntryViewModel<T>(this.factory(data), data, this.Entries().length == 0, this.EntrySelected, this.EntryChosen));
            });
        }
    }

    EntrySelected = (entry: SuggestionEntryViewModel<T>) => {
        $.each(this.Entries(),(i, vm) => {
            vm.selected(vm == entry);
        });
    }

    EntryChosen = (entry: T) => {
        this.onChoice(entry);
    }

    MoveDown = () => {
        var selectionIndex = -1;
        $.each(this.Entries(),(i, vm) => {
            if (vm.selected()) {
                selectionIndex = i;
            }
        });

        if (selectionIndex != -1 && (selectionIndex + 1) < this.Entries().length) {
            $.each(this.Entries(),(i, vm) => {
                vm.selected(i == selectionIndex + 1);
            });
        }
    }

    MoveUp = () => {
        var selectionIndex = -1;
        $.each(this.Entries(),(i, vm) => {
            if (vm.selected()) {
                selectionIndex = i;
            }
        });

        if (selectionIndex != -1 && selectionIndex != 0) {
            $.each(this.Entries(),(i, vm) => {
                vm.selected(i == selectionIndex - 1);
            });
        }
    }

    Choose = () => {
        $.each(this.Entries(),(i, vm) => {
            if (vm.selected()) {
                this.onChoice(vm.entity);
            }
        });
    }
} 
