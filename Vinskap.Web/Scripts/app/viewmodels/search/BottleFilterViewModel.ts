 
class BottleFilterViewModel extends ViewModel {

    searchTerm: KnockoutObservable<string>;
    sortOption: KnockoutObservable<string>;

    constructor(private onSearchChanged: (searchTerm: string, sortOption: string) => void) {
        super("search/BottleFilterView");
        this.searchTerm = ko.observable("");
        this.searchTerm.extend({ rateLimit: 500 });
        this.searchTerm.subscribe((v) => this.onChange());
        this.sortOption = ko.observable(this.sortOptions()[0]);
        this.sortOption.subscribe((v) => this.onChange());
    }

    sortOptions = () => {
        return ['Bought', 'Year', 'Price', 'Alcohol %'];
    }

    onChange = () => {
        this.onSearchChanged(this.searchTerm(), this.sortOption());
    }
}
