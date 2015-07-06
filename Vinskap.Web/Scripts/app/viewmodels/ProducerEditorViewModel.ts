class ProducerEditorViewModel extends ViewModel {

    producer: Producer;
    name: KnockoutObservable<string>;

    nameError: KnockoutObservable<string>;
    Error: KnockoutObservable<string>;

    constructor(searchTerm: string) {
        super("ProducerEditorView");
        this.nameError = ko.observable("");
        this.Error = ko.observable("");
        this.producer = Producer.fromSearchTerm(searchTerm);
        this.name = ko.observable(this.producer.Name);
        this.name.subscribe((v) => {
            this.validate();
        });
    }

    validate() {
        $.ajax("/api/producer/validate/", {
            data: this.toProducerDTO(),
            dataType: "json",
            traditional: true,
            contentType: 'application/json; charset=utf-8',
            type: "POST",
            success: (data) => {
                this.nameError("");
                this.Error("");
                $.each(data, (i, d) => {
                    if (d.Field == "Name") {
                        this.nameError(d.Message);
                    }
                    if (d.Field == "") {
                        this.Error(d.Message);
                    }
                });
            }
        });
    }

    toProducerDTO() {
        return JSON.stringify({ Name: this.name() });
    }
}   