
package com.lftechnology.library.service;

import com.lftechnology.library.exception.InvalidUserNameOrPasswordException;
import com.lftechnology.library.exception.TokenGenerationException;
import com.lftechnology.library.pojo.LoginPOJO;
import com.lftechnology.library.pojo.Token;

public interface AuthenticationService {

    public static final Integer TOKEN_EXPIRY_MINUTES = 10;
    public static final Integer TOKEN_DESTROY_MINUTES = 60 * 24 * 7;

    Token authenticate(LoginPOJO loginPojo)
        throws InvalidUserNameOrPasswordException, TokenGenerationException;
}
