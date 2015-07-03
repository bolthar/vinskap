
class NumericEditorViewModel extends ViewModel {

    value: KnockoutObservable<number>;
    defaultValue: number;
    defaultDelta: number;

    constructor(defaultValue: number, defaultDelta = 1) {
        super("NumericEditorView");
        this.defaultValue = defaultValue;
        this.value = ko.observable(defaultValue);
        this.value.subscribe((value) => {
            this.onValueChanged(value);
        });
        this.defaultDelta = defaultDelta;
    }

    Plus() {
        this.changeValue(1);
    } 
    
    Minus() {
        this.changeValue(-1);
    }    
    
    OnKeyDown(d, e) {
                
        if (e.keyCode == 38 || e.which == 43) {
            if (e.ctrlKey) {
                this.changeValue(10);
            } else {
                this.changeValue(1);
            }
            return false;
        }

        if (e.keyCode == 40 || e.which == 45) {
            if (e.ctrlKey) {
                this.changeValue(-10);
            } else {
                this.changeValue(-1);
            }
            return false;
        }

        return true;
    }

    changeValue(delta: number){
        this.value(this.value() + (delta * this.defaultDelta));
    }

    onValueChanged(value: number) {
        if (isNaN(Number(value))) {
            this.value(this.defaultValue);
        } else {
            this.value(Number(value));
        }
    }

}