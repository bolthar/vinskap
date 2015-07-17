
class KindEditorViewModel extends ViewModel implements IValidatable, IEditable<Kind> {

    name: FieldEditorViewModel<string>;
    error: KnockoutObservable<string>;
    wineType: KnockoutObservable<string>;   
    
    validatorProvider: ValidationProvider<Kind>;     

    constructor(searchTerm: string) {
        super("editors/KindEditorView");
        var kind = Kind.fromSearchTerm(searchTerm);        
        this.error = ko.observable("");
        this.wineType = ko.observable(kind.Type);        
        this.validatorProvider = new ValidationProvider(this.value, this.validatables, "/api/kind/validate");
        this.name = new FieldEditorViewModel("Name", kind.Name, this.validatorProvider.triggerValidation);
    }

    isSelected(wineType: string) {
        return this.wineType() == wineType;
    }

    selectType(wineType: string) {
        this.wineType(wineType);
    }

    value = () => {
        return new Kind(this.name.value(), this.wineType());
    }

    validatables = () => {
        return [this, this.name];
    }

    validate = (errors: Array<ErrorMessage>) => {
        new ValidationHandler(this.error, "").handle(errors);
    }
}  