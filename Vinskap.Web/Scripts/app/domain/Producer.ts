
class Producer {

    constructor(public Name: string) {
    }

    static fromJson(json: any) {
        return new Producer(json["Name"].toString());
    }

    static fromSearchTerm(term: string) {
        return new Producer(term);
    }
} 