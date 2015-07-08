/// <reference path="../Domain/Bottle.ts" />
/// <reference path="./SearchViewModel.ts" />


class BottleEditorViewModel extends ViewModel implements IValidatable {

    year: NumericEditorViewModel;
    price: NumericEditorViewModel;

    Wine = ko.observable<SearchViewModel<Wine>>();

    validatorProvider: ValidationProvider<Bottle>;
    wineError: KnockoutObservable<string>;

    constructor() {
        super("BottleEditorView");

        this.validatorProvider = new ValidationProvider(this.value, this.validatables, "/api/bottle/validate");
        this.Wine = ko.observable(new SearchViewModel<Wine>(
            (searchTerm, callback) => {
                Ajax.Get<Wine>(
                    "/api/wine?searchTerm=" + searchTerm,
                    (data) => Wine.fromJson(data),
                    callback);
            },
            (e) => new WineSuggestionViewModel(e),
            (st) => new WineEditorViewModel(st),
            this.validatorProvider.triggerValidation
            ));

        this.year = new NumericEditorViewModel("Year", 2012, this.validatorProvider.triggerValidation, 1);
        this.price = new NumericEditorViewModel("Price", 5, this.validatorProvider.triggerValidation, 0.1, 2, "€");        
        this.wineError = ko.observable("");
        this.validatorProvider.triggerValidation();
    }

    validatables = () => {
        return [this, this.year, this.price];
    }

    value = () => {
        return new Bottle(this.Wine().value(), this.year.value, this.price.value, new Date(Date.now())); // , Date.now());
    }

    validate = (errors: Array<ErrorMessage>) => {
        new ValidationHandler(this.wineError, "Wine").handle(errors);
    }

    hasErrors = () => this.wineError() != "" || this.year.hasErrors() || this.price.hasErrors();

}