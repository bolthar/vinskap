
class Kind {

    constructor(public Name: string, public Type: string) {
    }

    static fromJson(json: any) {
        return new Kind(json["Name"].toString(), json["Type"].toString());
    }

    static fromSearchTerm(term: string) {
        return new Kind(term, "red");
    }
} 