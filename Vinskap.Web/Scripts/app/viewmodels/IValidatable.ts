/// <reference path="../domain/ErrorMessage.ts" />

interface IValidatable {

    validate(errors: Array<ErrorMessage>): void;

} 