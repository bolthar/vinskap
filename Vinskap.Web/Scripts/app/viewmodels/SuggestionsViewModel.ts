/// <reference path="./SuggestionEntryViewModel.ts" />
/// <reference path="../domain/Wine.ts" />

class SuggestionsViewModel<T> extends ViewModel {

    Entries = ko.observableArray<SuggestionEntryViewModel<T>>();
    factory: (entity: T) => ViewModel;
    source: (searchTerm: string, onNewItem: (data: T) => void) => void;
    onChoice: (entry: T) => void;
    searchText: KnockoutObservable<string>;

    constructor(source: (searchTerm: string, onNewItem: (data: T) => void) => void, factory: (entity: T) => ViewModel, onChoice: (entry: T) => void) {
        super("SuggestionsView");
        this.searchText = ko.observable("")
        this.searchText.extend({ rateLimit: 500 });
        this.searchText.subscribe((value) => {
            this.OnValueChanged(value);
        });
        this.factory = factory;
        this.source = source;
        this.onChoice = onChoice;
    }

    SearchFor = (st: string) => {
        this.Entries.removeAll();
        if (st.length > 1) {
            this.source(st,(data) => {
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

    OnKeyDown = (d, e) => {
        if (e.keyCode == 38) {
            this.MoveUp();
            return false;
        }

        if (e.keyCode == 40) {
            this.MoveDown();
            return false;
        }

        if (e.keyCode == 13 || e.keyCode == 9) {
            this.Choose();
            return false;
        }

        return true;
    };

    OnValueChanged = function (value: string): void {
        this.SearchFor(value);
    };
} 
