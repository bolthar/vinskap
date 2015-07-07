
class ValidationHandler {

    constructor(private error: KnockoutObservable<string>, private targetField: string) {
    }

    handle = (errors: Array<ErrorMessage>) => {
        this.error("");
        $.each(errors.filter((e) => e.Field == this.targetField), (i, e) => {
            this.error(e.Message);
        });
    }
} 