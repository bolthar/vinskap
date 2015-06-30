
class Kind {

    public Name: string;
    public Type: string;

    constructor(json: any) {
        this.Name = json["Name"].toString();
        this.Type = json["Type"].toString();
    }
} 