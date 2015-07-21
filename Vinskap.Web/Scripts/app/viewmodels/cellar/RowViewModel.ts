/// <reference path="./PlaceViewModel.ts" />

class RowViewModel extends ViewModel {

    places: KnockoutObservableArray<PlaceViewModel>;    

    constructor(private rowNumber: number, nColumns: number,
        placeSelected: (selection: Place) => void,
        placeHighlighted: (selection: Place) => void)
    {
        super("cellar/RowView");
        this.places = ko.observableArray<PlaceViewModel>();    
        for (var i = 0; i < nColumns; i++) {
            this.places.push(new PlaceViewModel(i, (c) => placeSelected(c.AddRow(rowNumber)), (c) => placeHighlighted(c.AddRow(rowNumber))));
        }
    }

    setSelection = (selection: Place, isSelected: (f: (selection: Place) => boolean) => boolean) => {
        $.each(this.places(), (i, p) => {
            p.setSelection(selection.Row == this.rowNumber ? isSelected : (c) => false);
        });
    }

} 