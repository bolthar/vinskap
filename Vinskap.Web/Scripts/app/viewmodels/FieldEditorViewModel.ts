
class FieldEditorViewModel<T> extends ViewModel implements IValidatable {

    value: KnockoutObservable<T>;
    valueError: KnockoutObservable<string>;
    hasErrors: KnockoutComputed<boolean>;
    onChange: () => void;

    constructor(public label: string, startingValue: T, onChange: () => void) {
        super("FieldEditorView");
        this.value = ko.observable(startingValue);
        this.value.extend({ rateLimit: 500 });
        this.value.subscribe((v) => onChange());
        this.hasErrors = ko.pureComputed(() => this.valueError() != "");
        this.valueError = ko.observable("");
    }

    validate(errors: Array<ErrorMessage>) {
        new ValidationHandler(this.valueError, "Name").handle(errors);
    }
} 