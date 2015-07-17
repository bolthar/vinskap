
class KindSuggestionViewModel extends ViewModel {

    constructor(private kind: Kind) {
        super("display/KindDisplayView");
    }

    Title = function (): string {
        return this.kind.Name;
    }

    ContainerClass = function (): string {
        return this.kind.Type;
    }
} 