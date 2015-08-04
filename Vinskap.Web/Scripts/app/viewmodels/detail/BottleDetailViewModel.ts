/// <reference path="../display/BottleDisplayViewModel.ts" />

class BottleDetailViewModel extends ViewModel {

    display: BottleDisplayViewModel;

    constructor(private bottle: Bottle) {
        super("detail/BottleDetailView");
        this.display = new BottleDisplayViewModel(bottle);
    }

    ContainerClass = () => {
        return this.bottle.Wine.Kind.Type;
    }

    Price = () => {
        if (this.bottle.Price == null || parseInt(this.bottle.Price.toFixed(0)) == 0) {
            return "<no price>"
        } else {
            return this.bottle.Price.toFixed(2) + " €";
        }
    }

    AddedAt = () => {
        return this.bottle.AddedAt.toDateString();
    }
} 