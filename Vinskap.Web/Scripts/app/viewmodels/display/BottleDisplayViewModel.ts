/// <reference path="./WineDisplayViewModel.ts" />

class BottleDisplayViewModel extends ViewModel {

    bottle: Bottle;
    Wine: WineDisplayViewModel;

    constructor(bottle: Bottle) {
        super("display/BottleDisplayView");
        this.bottle = bottle;
        this.Wine = new WineDisplayViewModel(this.bottle.Wine);
    }

    Year = () => {
        return this.bottle.Year;
    }

    Alcohol = () => {
        return this.bottle.Wine.Alcohol.toFixed(1) + "%";
    }   

    ContainerClass = function (): string {
        return this.bottle.Wine.Kind.Type;
    }
} 