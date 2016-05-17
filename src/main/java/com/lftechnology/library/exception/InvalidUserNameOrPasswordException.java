
package com.lftechnology.library.exception;

public class InvalidUserNameOrPasswordException extends Exception {

    public InvalidUserNameOrPasswordException() {
        super();
    }

    public InvalidUserNameOrPasswordException(String message) {
        super(message);
    }
}
