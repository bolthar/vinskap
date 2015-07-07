
class ValidationProvider<T> {

    constructor(private entityProvider: () => T, private validatablesProvider: () => Array<IValidatable>, private targetUrl: string) {
    }

    triggerValidation = () => {
        Ajax.Post<T, Array<ErrorMessage>>(
            this.targetUrl,
            this.entityProvider(),
            (data) => ErrorMessage.fromJson(data),
            (data) => $.each(this.validatablesProvider(), (i, d) => d.validate(data))
        );
    }

} 