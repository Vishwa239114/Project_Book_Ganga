package com.gyansagar.exceptions;

public class InternalServerError extends Exception{
    public InternalServerError() {
        super("Internal Server Error. Please try later.");
    }

    public InternalServerError(String message) {
        super(message);
    }

    public InternalServerError(String message, Throwable cause) {
        super(message, cause);
    }
}
