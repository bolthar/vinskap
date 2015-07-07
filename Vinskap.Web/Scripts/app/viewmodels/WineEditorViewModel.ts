/// <reference path="./NumericEditorViewModel.ts" />
/// <reference path="./KindSuggestionViewModel.ts" />
/// <reference path="./KindEditorViewModel.ts" />
/// <reference path="./ProducerSuggestionViewModel.ts" />
/// <reference path="./ProducerEditorViewModel.ts" />

class WineEditorViewModel extends ViewModel {

    wine: Wine;
    name: KnockoutObservable<string>;
    kind: KnockoutObservable<SearchViewModel<Kind>>;
    producer: KnockoutObservable<SearchViewModel<Producer>>;
    alcohol: NumericEditorViewModel;

    constructor(searchTerm: string) {
        super("WineEditorView");
        this.wine = Wine.fromSearchTerm(searchTerm);
        this.name = ko.observable(this.wine.Name);
        this.kind = ko.observable(new SearchViewModel<Kind>(
            (searchTerm, callback) => {
                Ajax.Get<Kind>(
                    "/api/kind?searchTerm=" + searchTerm,
                    (data) => Kind.fromJson(data),
                    callback);
            },
            (e) => new KindSuggestionViewModel(e),
            (st) => new KindEditorViewModel(st)
            ));
        this.producer = ko.observable(new SearchViewModel<Producer>(
            (searchTerm, callback) => {
                Ajax.Get<Producer>(
                    "/api/producer?searchTerm=" + searchTerm,
                    (data) => Producer.fromJson(data),
                    callback);
            },
            (e) => new ProducerSuggestionViewModel(e),
            (st) => new ProducerEditorViewModel(st)
            ));
        this.alcohol = new NumericEditorViewModel("Alcohol", 12.5, 0.5, 1, "%");
    }
} 