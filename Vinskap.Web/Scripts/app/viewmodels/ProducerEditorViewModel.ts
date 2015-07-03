class ProducerEditorViewModel extends ViewModel {

    producer: Producer;
    name: KnockoutObservable<string>;

    constructor(searchTerm: string) {
        super("ProducerEditorView");
        this.producer = Producer.fromSearchTerm(searchTerm);
        this.name = ko.observable(this.producer.Name);
    }
}   