/// <reference path="./Wine.ts" />

class Bottle {

    constructor(public Wine: Wine, public Year: number, public Price: number, public AddedAt: Date) {
    }

    static fromJson(json: any) {
        return new Bottle(
            Wine.fromJson(json["Wine"]),
            json["Year"],
            json["Price"],
            new Date(Date.parse(json["AddedAt"])));
    }
} 