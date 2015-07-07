
class ErrorMessage {

    constructor(public Field: string, public Message: string) {
    }

    static fromJson(json: any): Array<ErrorMessage> {
        return $.map(json, (d, i) => {
            return new ErrorMessage(d.Field, d.Message);
        });
    }
}