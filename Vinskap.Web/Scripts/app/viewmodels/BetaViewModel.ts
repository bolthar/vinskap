
class BetaViewModel extends ViewModel {
    
    constructor() {
        super("BetaView");
    }

    Suggestions = function (searchTerm, callback) {
        setTimeout(() => {
            callback(['a', 'b', 'c', 'aaaa', 'bbb', 'abc', 'ababa','test','test2']);
        }, 500);
    }
} 