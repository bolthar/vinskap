/// <reference path="./SuggestionsViewModel.ts" />
/// <reference path="./SelectionViewModel.ts" />
/// <reference path="./EditorViewModel.ts" />

class SearchViewModel<T> extends ViewModel {

    CurrentState: KnockoutObservable<IEditable<T>>;

    suggestions: SuggestionsViewModel<T>;
    selection: SelectionViewModel<T>;
    editor: EditorViewModel<T>;

    constructor(
            private searchFunction: (searchTerm: string, onCompleted: (data: Array<T>) => void) => void,
            private templateFactory: (entity: T) => ViewModel,
            private editorFactory: (entity: string) => IEditable<T>,
            private onChanged: (() => void)
        )
    {
        super("editors/common/SearchView");
        this.CurrentState = ko.observable<IEditable<T>>();
        this.setSuggestions();
        this.CurrentState.subscribe((v) => onChanged());
    }

    OnSelected = (entity: T | string | any) => {
        if (typeof (entity) === "string") {
            this.editor = new EditorViewModel<T>(this.editorFactory(entity), this.OnCleared);
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

    value = () => {
        return this.CurrentState().value();
    }
} 