/// <reference path="./Bottle.ts" />

class RatedBottle {

    constructor(public Bottle: Bottle, public score?: number) {
    }

    static fromJson(json: any) {
        return new RatedBottle(
            Bottle.fromJson(json["Bottle"]),
            json["Score"]);
    }
} 