
class BottleListItemViewModel extends ViewModel {

    viewModel: ViewModel;

    constructor(private bottle: Bottle, private onClicked: (bottle: Bottle) => void) {
        super("search/BottleListItemView");
        this.viewModel = new BottleDisplayViewModel(bottle);
    }

    onClick = () => {
        this.onClicked(this.bottle);
    }
} 