/// <reference path="../../domain/Place.ts" />
/// <reference path="./RowViewModel.ts" />

class AisleViewModel extends ViewModel {

    rows: KnockoutObservableArray<RowViewModel>;
    Name: KnockoutObservable<string>;
    loading: KnockoutObservable<boolean>;

    constructor(private name: string, nRows: number, nColumns: number,
        placeSelected: (selection: Place) => void,
        placeHighlighted: (selection: Place) => void)
    {
        super("cellar/AisleView");   
        this.loading = ko.observable(true);
        this.Name = ko.observable(name);  
        this.rows = ko.observableArray<RowViewModel>();
        for (var i = 0; i < nRows; i++) {
            this.rows.push(new RowViewModel(i, nColumns, (c) => placeSelected(c.AddAisle(name)), (c) => placeHighlighted(c.AddAisle(name))));
        }

        this.reload();
    }

    reload = () => {
        this.loading(true);
        Ajax.Get("api/cellar/aisle?name=" + this.name, (d) => Place.fromJson(d), (data) => {
            $.each(data, (i, d) => {
                this.rows()[d.Row].places()[d.Column].setBottleTo(d.Bottle);
            });
            this.loading(false);
        });
    }

    setSelection = (selection: Place) => {
        $.each(this.rows(), (i, r) => {
            r.setSelection(selection, selection.Aisle == this.name ? (c) => c(selection) : (c) => false);
        });
    }

} 