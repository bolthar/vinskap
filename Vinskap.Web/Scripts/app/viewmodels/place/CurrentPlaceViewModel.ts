
class CurrentPlaceViewModel extends ViewModel {

    detail: ViewModel;

    constructor(private selection: Place) {
        super("place/CurrentPlaceView");
        if (selection.Bottle != null) {
            this.detail = new RatedBottleDisplayViewModel(selection.Bottle);
        } else {
            this.detail = new EmptyPlaceViewModel();            
        }
    }

    positionInfo = () => {        
        return "Aisle " + this.selection.Aisle + " - " + (this.selection.Row + 1).toString() + ":" + (this.selection.Column + 1).toString();
    }
} 