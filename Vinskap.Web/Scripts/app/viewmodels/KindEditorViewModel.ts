
class KindEditorViewModel extends ViewModel {

    kind: Kind;
    name: KnockoutObservable<string>;
    wineType: KnockoutObservable<string>;        

    constructor(searchTerm: string) {
        super("KindEditorView");
        this.kind = Kind.fromSearchTerm(searchTerm);
        this.name = ko.observable(this.kind.Name);
        this.wineType = ko.observable(this.kind.Type);
    }

    isSelected(wineType: string) {
        return this.wineType() == wineType;
    }

    selectType(wineType: string) {
        this.wineType(wineType);
    }
}  