
class NumericEditorViewModel extends ViewModel {

    value: number;
    textValue: KnockoutObservable<string>;
    Label: KnockoutObservable<string>;
    Glyph: KnockoutObservable<string>;

    constructor(label: string, private defaultValue: number, private defaultDelta = 1, private precision = 0, glyph = "") {
        super("NumericEditorView");
        this.textValue = ko.observable(this.defaultValue.toString());
        this.value = this.defaultValue;
        this.textValue.subscribe((value) => {
            this.onValueChanged(value);
        });
        this.Label = ko.observable(label);
        this.Glyph = ko.observable(glyph);
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
        this.value = this.value + (delta * this.defaultDelta);
        this.textValue(this.value.toFixed(this.precision))
    }

    onValueChanged(value: string) {
        if (!isNaN(Number(value))) {
            this.value = Number(Number(value).toFixed(this.precision));
        }
    }

}