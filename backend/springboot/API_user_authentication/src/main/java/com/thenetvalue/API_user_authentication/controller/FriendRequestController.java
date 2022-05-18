package com.thenetvalue.API_user_authentication.controller;

import com.thenetvalue.API_user_authentication.model.Friend;
import com.thenetvalue.API_user_authentication.model.FriendRequest;
import com.thenetvalue.API_user_authentication.model.FriendRequestResponse;
import com.thenetvalue.API_user_authentication.service.FriendRequestService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/request/")
public class FriendRequestController {

    FriendRequestService friendRequestService;

    public FriendRequestController(@Qualifier("RequestService") FriendRequestService friendRequestService){
        this.friendRequestService = friendRequestService;
    }

    @PostMapping()
    public FriendRequestResponse createNewRequest(@RequestBody FriendRequest newRequest){
        return this.friendRequestService.createNewRequest(newRequest);
    }
    @DeleteMapping("{requestId}")
    public FriendRequestResponse deleteRequest(@PathVariable("requestId")int requestId){
        return this.friendRequestService.deleteRequest(requestId);
    }

    @GetMapping("bysender/{senderId}")
    public List<FriendRequest> getAllBySender(@PathVariable("senderId")int senderId){
        return this.friendRequestService.findAllBySender(senderId);
    }

    @GetMapping("byreceiver/{receiverId}")
    public List<FriendRequest> getAllByReceiver(@PathVariable("receiverId")int receiverId){
        return this.friendRequestService.findAllByReceiver(receiverId);
    }
}
