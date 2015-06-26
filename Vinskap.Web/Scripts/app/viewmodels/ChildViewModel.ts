/// <reference path="./AlphaViewmodel.ts" />
/// <reference path="./BetaViewmodel.ts" />

class ChildViewModel extends ViewModel {

    alpha: AlphaViewModel;
    beta: BetaViewModel;

    DisplayValue: KnockoutObservable<string>

    constructor(value: string) {        
        super("ChildView");
        this.DisplayValue = ko.observable(value);            
        this.alpha = new AlphaViewModel();
        this.beta = new BetaViewModel();
        this.Current(this.alpha);
    }

    OnClicked = function () {
        if (this.Current() == this.alpha) {
            this.Current(this.beta);
        } else {
            this.Current(this.alpha);
        }
    }

    Current = ko.observable<ViewModel>();
} 