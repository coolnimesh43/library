
package com.lftechnology.library.service;

import java.io.IOException;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.lftechnology.library.exception.InvalidAccessTokenException;
import com.lftechnology.library.exception.InvalidUserNameOrPasswordException;
import com.lftechnology.library.exception.RefreshTokenExpiredException;
import com.lftechnology.library.exception.TokenExpiredExcpetion;
import com.lftechnology.library.exception.TokenExtractionException;
import com.lftechnology.library.exception.TokenGenerationException;
import com.lftechnology.library.model.User;
import com.lftechnology.library.pojo.LoginPOJO;
import com.lftechnology.library.pojo.Token;

public interface AuthenticationService {

    public static final Integer TOKEN_EXPIRY_MINUTES = 10;
    public static final Integer TOKEN_DESTROY_MINUTES = 60 * 24 * 7;

    /**
     * Method to authenticate the user. Takes in the {@link LoginPOJO}
     * containing login credentials and validates them. If found valid, a
     * refresh token and an access tokenn is generated and sent to user.
     * 
     * @author nimesh
     * @param loginPojo
     *            {@link LoginPOJO} A POJO containing login credentials.
     * @return {@link Token} A POJO containing token for REST API calls.
     * @throws InvalidUserNameOrPasswordException
     *             Thrown when the email and/or password is invalid.
     * @throws TokenGenerationException
     */
    Token authenticate(LoginPOJO loginPojo)
        throws InvalidUserNameOrPasswordException, TokenGenerationException;

    /**
     * Method to refresh an access token. The access token after being expired
     * need to be created again. The method creates an access token using the
     * refresh token presented by the user.
     * 
     * @author nimesh
     * @param refreshToken
     *            {@link String} The refresh token presented by the user.
     * @return {@link Token} The token containing newly generated access token.
     * @throws TokenExtractionException
     *             Exception generated while fetching data from refresh token.
     * @throws JsonProcessingException
     * @throws RefreshTokenExpiredException
     *             Exception occurred when refresh token presented by the user
     *             is invalid.
     */
    Token refreshAccessToken(String refreshToken)
        throws TokenExtractionException, JsonProcessingException, RefreshTokenExpiredException;

    /**
     * Method to validate the access token presented by the user.
     * 
     * @author nimesh
     * @param accessToken
     *            {@link String} The access token presented by the user.
     * @return {@link Map} of type {@link String} and {@link Object} The map
     *         containing values in the access token.
     * @throws TokenExpiredExcpetion
     *             Thrown when the token has expired
     * @throws TokenExtractionException
     *             Thrown when there is an error while extracting the data from
     *             access token.
     * @throws InvalidAccessTokenException
     *             Thrown when the access token can't be find in the database.
     * @throws RefreshTokenExpiredException
     *             Thrown when the refresh token is expired.
     */
    Map<String, Object> validateToken(String accessToken)
        throws TokenExpiredExcpetion, TokenExtractionException, InvalidAccessTokenException, RefreshTokenExpiredException;

    /**
     * Method to extract {@link User} Object from token.
     * 
     * @author nimesh
     * @param token
     *            {@link String} The token presented by the user.
     * @return {@link User} The user from the access token.
     * @throws TokenExpiredExcpetion
     *             Thrown when the token has expired
     * @throws TokenExtractionException
     *             Thrown when there is an error while extracting data from the
     *             token.
     * @throws JsonParseException
     *             Thrown when there is error while parsing user json string.
     * @throws JsonMappingException
     * @throws IOException
     */
    User getUserFromToken(String token)
        throws TokenExpiredExcpetion, TokenExtractionException, JsonParseException, JsonMappingException, IOException;

    /**
     * Method to logout the user by the token. This method removes the user
     * token from the database for the given token.
     * 
     * @author nimesh
     * @param token
     *            {@link Token} The token presented by the client.
     */
    void logout(Token token)
        throws InvalidAccessTokenException;
}
