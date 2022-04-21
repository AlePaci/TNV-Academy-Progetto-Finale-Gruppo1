package com.thenetvalue.API_user_authentication.DAO;

import com.thenetvalue.API_user_authentication.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository("UserDAO")
public interface UserRepositoryDAO extends CrudRepository<User,String> {

    User findByUsername(String username);

    @Transactional
    @Modifying
    @Query("update User u set u.username = ?1 where u.username = ?2")
    int updateUsernameByUsername(String newUsername, String username);

    @Transactional
    @Modifying
    @Query("update User u set u.password = ?1 where u.username = ?2")
    int updatePasswordByUsername(String password, String username);


}
