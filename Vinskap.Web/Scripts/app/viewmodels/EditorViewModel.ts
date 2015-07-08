
class EditorViewModel<T> extends ViewModel {

    constructor(public viewModel: IEditable<T>, public OnClear: () => void) {
        super("EditorView");
    }

    value = () => {
        return this.viewModel.value();
    }
} 