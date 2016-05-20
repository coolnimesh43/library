
package com.lftechnology.library.dao;

import com.lftechnology.library.model.UserToken;

public interface UserTokenDAO extends GenericDAO<UserToken, Long> {

    UserToken findByRefreshToken(String refreshToken);

    UserToken findByAccessToken(String accessToken);

    UserToken findByRefreshTokenAndAccessToken(String refreshToken, String accessToken);
}
