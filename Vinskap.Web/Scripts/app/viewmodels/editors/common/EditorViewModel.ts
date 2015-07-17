
class EditorViewModel<T> extends ViewModel {

    constructor(public viewModel: IEditable<T>, public OnClear: () => void) {
        super("editors/common/EditorView");
    }

    value = () => {
        return this.viewModel.value();
    }
} 