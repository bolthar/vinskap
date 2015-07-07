/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/knockout/knockout.d.ts" />
/// <reference path="services/ajax.ts" />
/// <reference path="viewmodels/ViewModel.ts" />
/// <reference path="viewmodels/ShellViewmodel.ts" />

class TemplateRepository {

    public templates: { [name: string]: HtmlTemplate } = {}

    getTemplate = function (key: string) : void
    {
        if (this.templates[key] == null) {
            this.templates[key] = new HtmlTemplate(key);
        }

        return this.templates[key];
    }
}

var templateRepository = new TemplateRepository();


class HtmlTemplate {

    constructor(private templateKey: string) {
    }

    template = ko.observable("<i class='icon-spinner icon-spin icon-large'></i>");

    loaded = false;

    _data = {};

    data = function (key: string, value: string = null) {
        if(value == null) {
            return this._data[key];
        }

        this._data[key] = value;
    }

    text = function (value: string = null) {
        if (!this.loaded) {
            this.loadTemplate();
            this.loaded = true;
        }

        if (value == null) {
            return this.template();
        } else {
            this.template(value);
        }
    }

    loadTemplate = function () : void {       
        $.get(this.templateKey,(t) => {
            this.template(t);
        });        
    }
}

function createHtmlTemplateEngine(templateEngine) {
    templateEngine.makeTemplateSource = function (templateName) {
        return templateRepository.getTemplate(templateName);
    }
    return templateEngine;
}

ko.setTemplateEngine(createHtmlTemplateEngine(new ko.nativeTemplateEngine()));

ko.applyBindings(new ShellViewModel(), $("#container")[0]);


