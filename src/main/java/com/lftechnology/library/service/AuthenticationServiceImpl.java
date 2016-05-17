
package com.lftechnology.library.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Map;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import org.apache.logging.log4j.Logger;

import com.auth0.jwt.internal.org.apache.commons.codec.digest.DigestUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lftechnology.library.config.ConfigurationProperties;
import com.lftechnology.library.dao.UserDAO;
import com.lftechnology.library.dao.UserTokenDAO;
import com.lftechnology.library.exception.InvalidUserNameOrPasswordException;
import com.lftechnology.library.exception.RefreshTokenExpiredException;
import com.lftechnology.library.exception.TokenExtractionException;
import com.lftechnology.library.exception.TokenGenerationException;
import com.lftechnology.library.model.User;
import com.lftechnology.library.model.UserToken;
import com.lftechnology.library.pojo.LoginPOJO;
import com.lftechnology.library.pojo.Token;
import com.lftechnology.library.util.WebTokenUtils;

@Transactional
@Stateless
public class AuthenticationServiceImpl implements AuthenticationService {

    @Inject
    private Logger logger;

    @Inject
    private UserDAO userDao;

    @Inject
    private UserTokenDAO userTokenDao;

    private String salt = ConfigurationProperties.instance().getSalt();

    @Override
    public Token authenticate(LoginPOJO loginPojo)
        throws InvalidUserNameOrPasswordException, TokenGenerationException {

        logger.debug("Inside AuthenticationServiceImpl#authenticate method. Login pojo is: {}", loginPojo);
        String saltedPassword = salt + loginPojo.getPassword();
        User user = this.userDao.findByemailAndPassword(loginPojo.getEmail(), DigestUtils.shaHex(saltedPassword));
        if (user == null) {
            throw new InvalidUserNameOrPasswordException();
        }
        Token token = this.generateToken(user);
        return token;
    }

    private Token generateToken(User user)
        throws TokenGenerationException {

        logger.debug("Inside AuthenticationServiceImpl#generateToken method. Generating token for user: {}", user);
        try {
            ObjectMapper mapper = new ObjectMapper();
            String userString = mapper.writeValueAsString(user);
            Map<String, Object> accessPayload = WebTokenUtils.makePayload(userString, TOKEN_EXPIRY_MINUTES);
            Map<String, Object> refreshPayload = WebTokenUtils.makePayload(userString, TOKEN_DESTROY_MINUTES);
            String accessToken = WebTokenUtils.payLoadToTokenString(accessPayload);
            String refreshToken = WebTokenUtils.payLoadToTokenString(refreshPayload);

            Token token = new Token(accessToken, refreshToken, user);
            Long exp = Long.valueOf(refreshPayload.get(WebTokenUtils.EXP).toString());
            Instant instant = Instant.ofEpochMilli(exp);
            LocalDateTime expiresAt = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());

            UserToken userToken = new UserToken(refreshToken, user, expiresAt);
            this.userTokenDao.save(userToken);
            return token;
        }
        catch (JsonProcessingException e) {
            throw new TokenGenerationException();
        }
    }

    private Token refreshAccessToken(String refreshToken)
        throws TokenExtractionException, JsonProcessingException, RefreshTokenExpiredException {
        logger.debug("Inside AuthenticationServiceImpl#refreshAccessToken method. Refresh token is: {}", refreshToken);
        UserToken userToken = this.userTokenDao.findByRefreshToken(refreshToken);
        if (userToken == null) {
            throw new TokenExtractionException();
        }
        LocalDateTime now = LocalDateTime.now();
        if (userToken.getExpiresAt().isAfter(now)) {
            User user = userToken.getUser();
            ObjectMapper mapper = new ObjectMapper();
            String userJson = mapper.writeValueAsString(user);
            Map<String, Object> accessPayload = WebTokenUtils.makePayload(userJson, TOKEN_EXPIRY_MINUTES);
            String accessToken = WebTokenUtils.payLoadToTokenString(accessPayload);

            Token token = new Token(accessToken, refreshToken, user);
            return token;
        }
        else {
            this.userTokenDao.delete(userToken.getId());
            throw new RefreshTokenExpiredException();
        }

    }

}
