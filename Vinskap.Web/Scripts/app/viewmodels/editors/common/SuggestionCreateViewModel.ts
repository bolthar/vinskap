﻿
class SuggestionCreateViewModel<T> extends ViewModel {

    term: string;

    constructor(term: string) {
        super("editors/common/SuggestionCreateView");
        this.term = term;
    }

    Title = function (): string {
        return this.term + " (create new)";
    }

    ContainerClass = function (): string {
        return "createnew";
    }
} 