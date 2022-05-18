package com.thenetvalue.API_user_authentication.DAO;

import com.thenetvalue.API_user_authentication.model.Friend;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("FriendDAO")
public interface FriendRepositoryDAO extends CrudRepository<Friend,Integer> {
    List<Friend> findByFriendA(int friendA);

    List<Friend> findByFriendB(int friendB);

}
