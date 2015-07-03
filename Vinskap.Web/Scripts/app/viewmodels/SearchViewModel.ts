/// <reference path="./SuggestionsViewModel.ts" />
/// <reference path="./SelectionViewModel.ts" />
/// <reference path="./WineEditorViewModel.ts" />
/// <reference path="./WineSuggestionViewModel.ts" />

class SearchViewModel<T> extends ViewModel {

    CurrentState: KnockoutObservable<ViewModel>;

    suggestions: SuggestionsViewModel<T>;
    selection: SelectionViewModel<T>;
    editor: ViewModel;

    constructor(
            private searchFunction: (searchTerm: string, onCompleted: (data: Array<T>) => void) => void,
            private templateFactory: (entity: T) => ViewModel,
            private editorFactory: (entity: string) => ViewModel)
    {
        super("SearchView");
        this.CurrentState = ko.observable<ViewModel>();
        this.setSuggestions();
    }

    OnSelected = (entity: T | string | any) => {
        if (typeof (entity) === "string") {
            this.editor = this.editorFactory(entity);
            this.CurrentState(this.editor);
        } else {
            this.selection = new SelectionViewModel<T>(entity, this.templateFactory(entity), this.OnCleared);
            this.CurrentState(this.selection);
        }        
    }

    OnCleared = () => {
        this.setSuggestions();
    }

    setSuggestions = () => {
        this.suggestions = new SuggestionsViewModel<T>(this.searchFunction, this.templateFactory, this.OnSelected);
        this.CurrentState(this.suggestions);
    }
} 