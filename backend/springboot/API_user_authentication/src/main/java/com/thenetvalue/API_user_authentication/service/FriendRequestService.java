package com.thenetvalue.API_user_authentication.service;

import com.thenetvalue.API_user_authentication.DAO.FriendRequestRepositoryDAO;
import com.thenetvalue.API_user_authentication.model.FriendRequest;
import com.thenetvalue.API_user_authentication.model.FriendRequestResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("RequestService")
public class FriendRequestService {
    FriendRequestRepositoryDAO friendRequestDAO;

    public FriendRequestService(@Qualifier("RequestDAO") FriendRequestRepositoryDAO friendRequestRepositoryDAO){
        this.friendRequestDAO = friendRequestRepositoryDAO;
    }

    public FriendRequestResponse createNewRequest(FriendRequest newRequest){
        return new FriendRequestResponse(this.friendRequestDAO.save(newRequest),"REQUEST_CREATED");
    }

    public FriendRequestResponse deleteRequest(int requestId){
        FriendRequest request = this.friendRequestDAO.findById(requestId).get();
        this.friendRequestDAO.delete(request);
        return new FriendRequestResponse(request,"REQUEST_DELETED");
    }

    public List<FriendRequest> findAllByReceiver(int receiverId){
        return this.friendRequestDAO.findByReceiver(receiverId);
    }

    public List<FriendRequest> findAllBySender(int senderId){
        return this.friendRequestDAO.findBySender(senderId);
    }
}
