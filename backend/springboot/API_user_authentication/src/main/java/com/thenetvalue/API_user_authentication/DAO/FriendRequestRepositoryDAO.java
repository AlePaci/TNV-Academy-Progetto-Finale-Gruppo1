package com.thenetvalue.API_user_authentication.DAO;

import com.thenetvalue.API_user_authentication.model.FriendRequest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("RequestDAO")
public interface FriendRequestRepositoryDAO extends CrudRepository<FriendRequest,Integer> {

    List<FriendRequest> findByReceiver(int receiver);

    List<FriendRequest> findBySender(int sender);


}
