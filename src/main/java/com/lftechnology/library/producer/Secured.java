
package com.lftechnology.library.producer;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.ws.rs.NameBinding;

import com.lftechnology.library.enums.RoleEnum;

@NameBinding
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD, ElementType.TYPE })
public @interface Secured {

    RoleEnum[] value() default {};
}
