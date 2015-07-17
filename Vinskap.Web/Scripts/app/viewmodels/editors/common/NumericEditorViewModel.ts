
class NumericEditorViewModel extends ViewModel implements IValidatable {

    value: number;
    textValue: KnockoutObservable<string>;
    Label: KnockoutObservable<string>;
    Glyph: KnockoutObservable<string>;

    error: KnockoutObservable<string>;
    hasErrors: KnockoutComputed<boolean>;

    constructor(label: string, private defaultValue: number, onChange: () => void, private defaultDelta = 1, private precision = 0, glyph = "") {
        super("editors/common/NumericEditorView");
        this.textValue = ko.observable(this.defaultValue.toString());
        this.value = this.defaultValue;
        this.textValue.subscribe((value) => {
            this.onValueChanged(value);
            onChange();
        });
        this.Label = ko.observable(label);
        this.Glyph = ko.observable(glyph);
        this.error = ko.observable("");
        this.hasErrors = ko.pureComputed(() => this.error() != "");
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

    validate = (errors: Array<ErrorMessage>) => {
        new ValidationHandler(this.error, this.Label()).handle(errors);
    }
}