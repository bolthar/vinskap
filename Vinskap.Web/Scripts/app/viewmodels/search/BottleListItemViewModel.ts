
class BottleListItemViewModel extends ViewModel {

    viewModel: ViewModel;

    constructor(private bottle: RatedBottle, private onClicked: (bottle: RatedBottle) => void) {
        super("search/BottleListItemView");
        this.viewModel = new RatedBottleDisplayViewModel(bottle);
    }

    onClick = () => {        
        this.onClicked(this.bottle);
    }
} 