/// <reference path="../detail/BottleDetailViewModel.ts" />
/// <reference path="../../domain/Rating.ts" /> 

class RateBottleViewModel extends ViewModel {

    Detail: BottleDetailViewModel;

    constructor(private bottle: Bottle, private onBottleRated: () => void) {
        super("rating/RateBottleView");
        this.Detail = new BottleDetailViewModel(bottle);
    }

    //ewwwww

    vote1 = () => this.vote(1);
    vote2 = () => this.vote(2);
    vote3 = () => this.vote(3);
    vote4 = () => this.vote(4);
    vote5 = () => this.vote(5);

    vote = (score: number) => {
        Ajax.Post("api/bottle/rate", new Rating(this.bottle, score), (r) => r, (r) => this.onBottleRated());
    }

} 