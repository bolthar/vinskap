
class ShellViewModel {    

    value = ko.observable("test");

    View = function (): string {
        return 'Scripts/app/views/ShellView.html'
    }
}