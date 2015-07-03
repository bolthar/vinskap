/// <reference path="./SuggestionEntryViewModel.ts" />
/// <reference path="./SuggestionCreateViewModel.ts" />
/// <reference path="../domain/Wine.ts" />

class SuggestionsViewModel<T> extends ViewModel {

    Entries = ko.observableArray<SuggestionEntryViewModel<T>>();
    factory: (entity: T) => ViewModel;
    source: (searchTerm: string, onCompleted: (data: Array<T>) => void) => void;
    onChoice: (entry: T | string) => void;
    searchText: KnockoutObservable<string>;

    constructor(source: (searchTerm: string, onCompleted: (data: Array<T>) => void) => void, factory: (entity: T) => ViewModel, onChoice: (entry: T | string) => void) {
        super("SuggestionsView");
        this.searchText = ko.observable("")
        this.searchText.extend({ rateLimit: 500 });
        this.searchText.subscribe((value) => {
            this.SearchFor(value);
        });
        this.factory = factory;
        this.source = source;
        this.onChoice = onChoice;
    }

    SearchFor = (st: string) => {
        this.Entries.removeAll();
        if (st.length > 1) {
            this.source(st,(data) => {
                $.each(data,(d, v) => {
                    this.Entries.push(new SuggestionEntryViewModel<T>(this.factory(v), this.Entries().length == 0, this.EntrySelected, () => this.onChoice(v)));
                });
                this.Entries.push(new SuggestionEntryViewModel<T>(new SuggestionCreateViewModel(st), this.Entries().length == 0, this.EntrySelected, () => this.onChoice(st)));
            });
        }
    }

    EntrySelected = (entry: SuggestionEntryViewModel<T>) => {
        $.each(this.Entries(),(i, vm) => {
            vm.selected(vm == entry);
        });
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
                vm.Choose();
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
            return true;
        }

        return true;
    };
} 
