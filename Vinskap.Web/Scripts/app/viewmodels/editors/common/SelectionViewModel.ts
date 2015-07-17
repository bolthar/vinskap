
class SelectionViewModel<T> extends ViewModel implements IEditable<T> {

    entity: T;

    viewModel: KnockoutObservable<ViewModel>;
    onClear: () => void;

    constructor(entity: T, viewModel: ViewModel, onClear :() => void) {
        super("editors/common/SelectionView");
        this.entity = entity;
        this.viewModel = ko.observable(viewModel);
        this.onClear = onClear;
    }

    Clear = () => {
        this.onClear();
    }

    value = () => {
        return this.entity;
    }
} 