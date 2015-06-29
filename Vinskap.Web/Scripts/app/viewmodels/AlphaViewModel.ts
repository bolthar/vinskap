
class AlphaViewModel extends ViewModel {
    
    constructor() {
        super("AlphaView");
    }

    Load = function (): void {
        this.ViewName("LoadingView");
        setTimeout(() => {
            this.ViewName("AlphaView");
            this.myvalue("loaded");
        }, 5000);
    }

    OnClicked = function () {
        this.Load();
    }
    
    myvalue = ko.observable<string>("none");
} 