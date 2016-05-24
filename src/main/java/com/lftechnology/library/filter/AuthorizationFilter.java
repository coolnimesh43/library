
package com.lftechnology.library.filter;

import java.io.IOException;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.lftechnology.library.dao.UserRoleDAO;
import com.lftechnology.library.enums.RoleEnum;
import com.lftechnology.library.model.UserRole;
import com.lftechnology.library.pojo.AuthenticatedUserWrapper;
import com.lftechnology.library.producer.AuthenticatedUser;
import com.lftechnology.library.producer.Secured;

//@RequestScoped
// @Secured
// @Priority(Priorities.AUTHORIZATION)
public class AuthorizationFilter implements ContainerRequestFilter {

    @Context
    private ResourceInfo resourceInfo;

    @Inject
    @AuthenticatedUser
    private AuthenticatedUserWrapper authenticatedUserWrapper;

    @Inject
    private UserRoleDAO userRoleServiceImpl;

    @Override
    public void filter(ContainerRequestContext requestContext)
        throws IOException {
        Class<?> resourceClass = resourceInfo.getResourceClass();
        List<RoleEnum> classRoles = extractRoles(resourceClass);
        Method resourceMethod = resourceInfo.getResourceMethod();
        List<RoleEnum> methodRoles = extractRoles(resourceMethod);
        try {
            if (!classRoles.isEmpty()) {
                checkPermission(classRoles);
            }
            else if (!methodRoles.isEmpty()) {
                checkPermission(methodRoles);
            }
        }
        catch (Exception e) {
            requestContext.abortWith(Response.status(Status.UNAUTHORIZED).build());
        }

    }

    private List<RoleEnum> extractRoles(AnnotatedElement annotatedElement) {
        List<RoleEnum> roles = new ArrayList<RoleEnum>();
        if (annotatedElement == null) {
            return roles;
        }
        Secured secured = annotatedElement.getAnnotation(Secured.class);
        if (secured == null) {
            return roles;
        }
        roles.addAll(Arrays.asList(secured.value()));
        return roles;
    }

    private void checkPermission(List<RoleEnum> roles)
        throws Exception {
        List<UserRole> userRoles = this.userRoleServiceImpl.findByUser(authenticatedUserWrapper.getUser());
        Boolean isValid = userRoles.stream().anyMatch(userRole -> roles.contains(RoleEnum.valueOf(userRole.getRole().getName())));
        if (!isValid) {
            throw new Exception("Invalid roles");
        }
    }

}
