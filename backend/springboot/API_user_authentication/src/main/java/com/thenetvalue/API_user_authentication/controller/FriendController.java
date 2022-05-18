package com.thenetvalue.API_user_authentication.controller;

import com.thenetvalue.API_user_authentication.model.Friend;
import com.thenetvalue.API_user_authentication.model.FriendResponse;
import com.thenetvalue.API_user_authentication.service.FriendService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/friend/")
public class FriendController {

    FriendService friendService;

    public FriendController(@Qualifier("FriendService") FriendService friendService){
        this.friendService = friendService;
    }

    @PostMapping()
    public FriendResponse createFriend(@RequestBody Friend newFriend){
        return this.friendService.createFriend(newFriend);
    }

    @DeleteMapping("{friendId}")
    public FriendResponse deleteFriend(@PathVariable("friendId")int friendId){
        return this.friendService.deleteFriend(friendId);
    }

    @GetMapping("bya/{aId}")
    public List<Friend> getAllFriendByA(@PathVariable("aId")int aId){
        return this.friendService.getAllFriendsByFriendA(aId);
    }
    @GetMapping("byb/{bId}")
    public List<Friend> getAllFriendByB(@PathVariable("bId")int bId){
        return this.friendService.getAllFriendsByFriendB(bId);
    }


}
