package com.thenetvalue.API_user_authentication.service;

import com.thenetvalue.API_user_authentication.DAO.FriendRepositoryDAO;
import com.thenetvalue.API_user_authentication.model.Friend;
import com.thenetvalue.API_user_authentication.model.FriendResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("FriendService")
public class FriendService {
    FriendRepositoryDAO friendRepositoryDAO;

    public FriendService(@Qualifier("FriendDAO")FriendRepositoryDAO friendRepositoryDAO){
        this.friendRepositoryDAO = friendRepositoryDAO;
    }

    public FriendResponse createFriend(Friend newFriend){
        return new FriendResponse(this.friendRepositoryDAO.save(newFriend),"FRIEND_CREATED");
    }

    public FriendResponse deleteFriend(int friendId){
        Friend friend = this.friendRepositoryDAO.findById(friendId).get();
        this.friendRepositoryDAO.delete(friend);
        return new FriendResponse(friend,"FRIEND_DELETED");
    }

    public List<Friend> getAllFriendsByFriendA(int friendAId){
        return this.friendRepositoryDAO.findByFriendA(friendAId);
    }

    public List<Friend> getAllFriendsByFriendB(int friendBId){
        return this.friendRepositoryDAO.findByFriendB(friendBId);
    }
}
