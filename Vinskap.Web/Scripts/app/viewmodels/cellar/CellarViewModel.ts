/// <reference path="../../Domain/Place.ts" />
/// <reference path="./AisleViewModel.ts" />

class CellarViewModel extends ViewModel {

    aisles: KnockoutObservableArray<AisleViewModel>;

    constructor(private onPlaceSelected: (selection: Place) => void,
                onPlaceHighlighted: (selection: Place) => void) {
        super("cellar/CellarView");
        this.aisles = ko.observableArray<AisleViewModel>();
        Ajax.Get("api/cellar", (a) => new AisleViewModel(a.Name, a.Rows, a.Columns, this.selectPlace, onPlaceHighlighted), (asls) => {            
            $.each(asls, (i, v) => this.aisles.push(v));
        });
    }

    selectPlace = (selection: Place) => {        
        this.setSelection(selection);
        this.onPlaceSelected(selection);
    }

    setSelection = (selection: Place) => {
        $.each(this.aisles(), (i, a) => {
            a.setSelection(selection);
        });
    }
} 