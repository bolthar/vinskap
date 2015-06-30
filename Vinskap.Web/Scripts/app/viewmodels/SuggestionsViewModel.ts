/// <reference path="./SuggestionEntryViewModel.ts" />
/// <reference path="../domain/Wine.ts" />

class SuggestionsViewModel extends ViewModel {

    Entries = ko.observableArray<SuggestionEntryViewModel>();

    constructor() {
        super("SuggestionsView");
    }

    SearchFor = function (searchTerm: string): void {
        this.Entries.removeAll();
        if (searchTerm.length > 1) {
            $.get("/api/wine?searchTerm=" + searchTerm,(data) => {
                $.each(data,(i) => this.Entries.push(new SuggestionEntryViewModel(new Wine(data[i]), i == 0, this.EntrySelected, this.EntryChosen)));
            });
        }
    }

    EntrySelected = (entry: SuggestionEntryViewModel) => {
        $.each(this.Entries(),(i, vm) => {
            vm.selected(vm == entry);
        });
    }

    EntryChosen = (entry: Wine) => {
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

    }
} 
