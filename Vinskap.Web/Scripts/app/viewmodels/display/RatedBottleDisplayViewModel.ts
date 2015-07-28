/// <reference path="./BottleDisplayViewModel.ts" />

class RatedBottleDisplayViewModel extends ViewModel {

    bottle: RatedBottle;
    BottleDisplay: BottleDisplayViewModel;

    constructor(bottle: RatedBottle) {
        super("display/RatedBottleDisplayView");
        this.bottle = bottle;
        this.BottleDisplay = new BottleDisplayViewModel(this.bottle.Bottle);
    }

    ContainerClass = function (): string {
        return this.bottle.Bottle.Wine.Kind.Type;
    }

    Scores = () => {
        if (this.bottle.score == null)
            return null;

        alert(new Number(this.bottle.score.toFixed(0)));
        return new Array(3);
    }
}  