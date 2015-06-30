
class Producer {

    public Name: string;

    constructor(json: any) {
        this.Name = json["Name"].toString();
    }
} 