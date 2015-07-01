
class SelectionViewModel<T> extends ViewModel {

    entity: T;

    viewModel: KnockoutObservable<ViewModel>;
    onClear: () => void;

    constructor(entity: T, viewModel: ViewModel, onClear :() => void) {
        super("SelectionView");
        this.entity = entity;
        this.viewModel = ko.observable(viewModel);
        this.onClear = onClear;
    }

    Clear = () => {
        this.onClear();
    }
} 