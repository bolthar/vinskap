
class KindSuggestionViewModel extends ViewModel {

    constructor(private kind: Kind) {
        super("KindSuggestionView");
    }

    Title = function (): string {
        return this.kind.Name;
    }

    ContainerClass = function (): string {
        return this.kind.Type;
    }
} 