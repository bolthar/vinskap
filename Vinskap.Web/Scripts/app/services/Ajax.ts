
class Ajax {

    static Get<T>(url: string, transform: (data: any) => T, callback: (result: Array<T>) => void) {
        $.get(url, (data) => {
            callback($.map(data, (i) => transform(i)));
        });
    }

    static Post<T, TRes>(url: string, postData: T, resultTransform: (response: any) => TRes, onSuccess: (data: TRes) => void) {
        $.ajax(url, {
            data: JSON.stringify(postData),
            dataType: "json",
            traditional: true,
            contentType: 'application/json; charset=utf-8',
            type: "POST",
            success: (data) => {
                onSuccess(resultTransform(data));
            }
        });
    }
} 