/// <reference path="./editors/BottleEditorViewModel.ts" />

class AddBottleViewModel extends ViewModel implements IContainer {

    bottleEditor: KnockoutObservable<BottleEditorViewModel>;
    hasErrors: KnockoutComputed<boolean>;

    title = "Add new bottle";

    constructor() {
        super("AddBottleView");
        this.bottleEditor = ko.observable(new BottleEditorViewModel());
        this.hasErrors = ko.pureComputed(() => this.bottleEditor().hasErrors());
    }

    addNewBottle = () => {
        Ajax.Post<Bottle, any>("/api/bottle/create", this.bottleEditor().value(), (data) => null, (data) => {
            this.bottleEditor(new BottleEditorViewModel());
        });
    }
} 