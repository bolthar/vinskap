/// <reference path="./Wine.ts" />

class Bottle {

    constructor(public Guid: string, public Wine: Wine, public Year: number, public Price: number, public AddedAt: Date) {
    }

    static fromJson(json: any) {
        return new Bottle(
            json["Guid"],
            Wine.fromJson(json["Wine"]),
            json["Year"],
            json["Price"],
            new Date(Date.parse(json["AddedAt"])));
    }
} 