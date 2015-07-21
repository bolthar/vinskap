
class PlaceViewModel extends ViewModel {

    bottle: KnockoutObservable<Bottle>;
    CurrentState: KnockoutComputed<string>;

    isSelected: KnockoutObservable<boolean>;

    constructor(private column: number,
        private onSelected: (selection: Place) => void,


        private onHighlighted: (selection: Place) => void
        )
        {
        super("cellar/PlaceView");
        this.isSelected = ko.observable(false);
        this.bottle = ko.observable(null);
        this.CurrentState = ko.pureComputed(() => {
            if (this.bottle == null || this.bottle() == null) {
                return "empty";
            }
            return this.bottle().Wine.Kind.Type;
        });
    }

    onClick = () => {
        if (this.bottle != null) {
            this.onSelected(this.getPlace());
        }
    }

    onHover = () => {
        if (this.bottle != null) {
            this.onHighlighted(this.getPlace());
        }
    }

    setBottleTo = (bottle: Bottle) => {
        this.bottle(bottle);
    }

    setSelection = (isSelected: (f: (selection: Place) => boolean) => boolean) => {            
        this.isSelected(isSelected((f) => f.Column == this.column));
    }

    getPlace = () => {
        var selection = new Place(0, this.column, "", this.bottle());
        return selection;
    }
} 