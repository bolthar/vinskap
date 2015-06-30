/// <reference path="./Kind.ts" />
/// <reference path="./Producer.ts" />

class Wine {

    public Name: string;
    public Kind: Kind;
    public Producer: Producer;
    public Alcohol: number;

    constructor(json: any) {
        this.Name = json["Name"].toString();
        this.Kind = new Kind(json["Kind"]);
        this.Producer = new Producer(json["Producer"]);
        this.Alcohol = +json["Alcohol"];
    }
} 