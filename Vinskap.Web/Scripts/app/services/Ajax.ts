﻿
class Ajax {

    static Get<T>(url: string, transform: (data: any) => T, callback: (result: Array<T>) => void) {
        $.get(url, (data) => {
            if (data instanceof Array) {
                callback($.map(data, (i) => transform(i)));
            } else {
                callback([transform(data)]);
            }
        });
    }

    static Post<T, TRes>(url: string, postData: T, resultTransform: (response: any) => TRes, onSuccess: (data: TRes) => void) {        
        $.ajax(url, {
            data: JSON.stringify(postData),
            contentType: 'application/json',
            type: "POST",
            success: (data) => {
                onSuccess(resultTransform(data));
            }
        });
    }
} 