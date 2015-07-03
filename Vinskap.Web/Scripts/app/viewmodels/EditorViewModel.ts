
class EditorViewModel extends ViewModel {

    constructor(public viewModel: ViewModel, public OnClear: () => void) {
        super("EditorView");
    }
} 