/// <reference path="../domain/ErrorMessage.ts" />
/// <reference path="./IValidatable.ts" />
/// <reference path="./FieldEditorViewModel.ts" />
/// <reference path="../Services/ValidationProvider.ts" />
/// <reference path="../Services/ValidationHandler.ts" />

class ProducerEditorViewModel extends ViewModel implements IValidatable, IEditable<Producer> {

    name: FieldEditorViewModel<string>;

    Error: KnockoutObservable<string>;

    validatorProvider: ValidationProvider<Producer>;

    constructor(searchTerm: string) {
        super("ProducerEditorView");
        this.Error = ko.observable("");
        this.validatorProvider = new ValidationProvider(this.value, this.validatables, "/api/producer/validate");
        this.name = new FieldEditorViewModel("Name", searchTerm, this.validatorProvider.triggerValidation);
    }

    value = () => {
        return new Producer(this.name.value());
    }

    validatables = (): Array<IValidatable> => {
        return [this, this.name];
    }

    validate = (errors: Array<ErrorMessage>) => { 
        new ValidationHandler(this.Error, "").handle(errors);
    }
}   