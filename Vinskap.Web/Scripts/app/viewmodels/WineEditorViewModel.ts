/// <reference path="./NumericEditorViewModel.ts" />
/// <reference path="./KindSuggestionViewModel.ts" />
/// <reference path="./KindEditorViewModel.ts" />
/// <reference path="./ProducerSuggestionViewModel.ts" />
/// <reference path="./ProducerEditorViewModel.ts" />

class WineEditorViewModel extends ViewModel implements IValidatable, IEditable<Wine> {

    name: FieldEditorViewModel<string>;
    kind: KnockoutObservable<SearchViewModel<Kind>>;
    producer: KnockoutObservable<SearchViewModel<Producer>>;
    alcohol: NumericEditorViewModel;

    error: KnockoutObservable<string>;
    kindError: KnockoutObservable<string>;
    producerError: KnockoutObservable<string>;

    validatorProvider: ValidationProvider<Wine>;

    constructor(searchTerm: string) {
        super("WineEditorView");

        this.validatorProvider = new ValidationProvider(this.value, this.validatables, "/api/wine/validate");

        this.kind = ko.observable(new SearchViewModel<Kind>(
            (searchTerm, callback) => {
                Ajax.Get<Kind>(
                    "/api/kind?searchTerm=" + searchTerm,
                    (data) => Kind.fromJson(data),
                    callback);
            },
            (e) => new KindSuggestionViewModel(e),
            (st) => new KindEditorViewModel(st),
            this.validatorProvider.triggerValidation
            ));

        this.producer = ko.observable(new SearchViewModel<Producer>(
            (searchTerm, callback) => {
                Ajax.Get<Producer>(
                    "/api/producer?searchTerm=" + searchTerm,
                    (data) => Producer.fromJson(data),
                    callback);
            },
            (e) => new ProducerSuggestionViewModel(e),
            (st) => new ProducerEditorViewModel(st),
            this.validatorProvider.triggerValidation
            ));

        this.name = new FieldEditorViewModel("Name", searchTerm, this.validatorProvider.triggerValidation);

        this.error = ko.observable("");
        this.kindError = ko.observable("");        
        this.producerError = ko.observable("");        

        this.alcohol = new NumericEditorViewModel("Alcohol", 12.5, this.validatorProvider.triggerValidation, 0.5, 1, "%");
        this.validatorProvider.triggerValidation();        
    }

    value = () => {
        return new Wine(this.name.value(), this.kind().value(), this.producer().value(), this.alcohol.value);
    }

    validatables = () => {
        return [this, this.name, this.alcohol];
    }

    validate = (errors: Array<ErrorMessage>) => {
        new ValidationHandler(this.error, "").handle(errors);
        new ValidationHandler(this.kindError, "Kind").handle(errors);
        new ValidationHandler(this.producerError, "Producer").handle(errors);
    }
} 