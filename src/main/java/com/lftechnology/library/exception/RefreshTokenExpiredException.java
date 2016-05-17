
package com.lftechnology.library.exception;

public class RefreshTokenExpiredException extends Exception {

    public RefreshTokenExpiredException() {
        super();
    }

    public RefreshTokenExpiredException(String message) {
        super(message);
    }
}
