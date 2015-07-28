/// <reference path="./Kind.ts" />
/// <reference path="./Producer.ts" />

class Wine {

    constructor(public Name: string, public Kind: Kind, public Producer: Producer, public Alcohol: number) {        
    }

    static fromJson(json: any) {
        return new Wine(
            json["Name"],
            Kind.fromJson(json["Kind"]),
            Producer.fromJson(json["Producer"]),
            json["Alcohol"]
            );
    }

    static fromSearchTerm(term: string) {
        return new Wine(
            term,
            null,
            null,
            0);
    }
} 