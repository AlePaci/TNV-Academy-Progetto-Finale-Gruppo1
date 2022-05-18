package com.thenetvalue.API_user_authentication.model;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.persistence.*;

@Entity
@EnableJpaAuditing
public class Friend extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT(11) UNSIGNED")
    private int id;

    @Column(nullable = false ,columnDefinition = "INT(11) UNSIGNED")
    private int friendA;

    @Column( nullable = false ,columnDefinition = "INT(11) UNSIGNED")
    private int friendB;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFriendA() {
        return friendA;
    }

    public void setFriendA(int friendA) {
        this.friendA = friendA;
    }

    public int getFriendB() {
        return friendB;
    }

    public void setFriendB(int friendB) {
        this.friendB = friendB;
    }
}
