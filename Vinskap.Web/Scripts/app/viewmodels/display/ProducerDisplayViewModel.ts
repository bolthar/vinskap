class ProducerSuggestionViewModel extends ViewModel {

    constructor(private producer: Producer) {
        super("display/ProducerDisplayView");
    }

    Title = function (): string {
        return this.producer.Name;
    }

    ContainerClass = function (): string {
        return "entry";
    }
}  