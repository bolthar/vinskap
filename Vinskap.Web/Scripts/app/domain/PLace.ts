
class Place {

    constructor(public Row: number, public Column: number, public Aisle: string, public Bottle: Bottle) {
    }

    static fromJson(json: any) {
        return new Place(
            json["Row"],
            json["Column"],
            json["Aisle"],
            json["Bottle"] != null ? Bottle.fromJson(json["Bottle"]) : null);
    }

    AddRow = (row: number) => {
        this.Row = row;
        return this;
    }

    AddAisle = (aisle: string) => {
        this.Aisle = aisle;
        return this;
    }
}
 