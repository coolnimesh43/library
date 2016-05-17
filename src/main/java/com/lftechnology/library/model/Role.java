
package com.lftechnology.library.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "roles")
public class Role extends AbstractEntity {

    @Column(name = "name", unique = true, nullable = false)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Role [name=" + name + "]";
    }

}
