
class KindEditorViewModel extends ViewModel implements IValidatable {

    kind: Kind;
    name: FieldEditorViewModel<string>;
    error: KnockoutObservable<string>;
    wineType: KnockoutObservable<string>;   
    
    validatorProvider: ValidationProvider<Kind>;     

    constructor(searchTerm: string) {
        super("KindEditorView");
        this.kind = Kind.fromSearchTerm(searchTerm);        
        this.error = ko.observable("");
        this.wineType = ko.observable(this.kind.Type);        
        this.validatorProvider = new ValidationProvider(this.toKind, this.validatables, "/api/kind/validate");
        this.name = new FieldEditorViewModel("Name", this.kind.Name, this.validatorProvider.triggerValidation);
    }

    isSelected(wineType: string) {
        return this.wineType() == wineType;
    }

    selectType(wineType: string) {
        this.wineType(wineType);
    }

    toKind = () => {
        return new Kind(this.name.value(), this.wineType());
    }

    validatables = () => {
        return [this, this.name];
    }

    validate = (errors: Array<ErrorMessage>) => {
        new ValidationHandler(this.error, "").handle(errors);
    }
}  