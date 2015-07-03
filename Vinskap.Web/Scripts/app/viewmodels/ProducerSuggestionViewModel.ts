class ProducerSuggestionViewModel extends ViewModel {

    constructor(private producer: Producer) {
        super("ProducerSuggestionView");
    }

    Title = function (): string {
        return this.producer.Name;
    }

    ContainerClass = function (): string {
        return "entry";
    }
}  