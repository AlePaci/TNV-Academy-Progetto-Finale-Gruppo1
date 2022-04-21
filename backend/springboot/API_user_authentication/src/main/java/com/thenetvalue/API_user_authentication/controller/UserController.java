package com.thenetvalue.API_user_authentication.controller;

import com.thenetvalue.API_user_authentication.model.StringUpdate;
import com.thenetvalue.API_user_authentication.model.User;
import com.thenetvalue.API_user_authentication.model.exceptions.*;
import com.thenetvalue.API_user_authentication.model.RequestResponse;
import com.thenetvalue.API_user_authentication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class UserController {
    UserService userService;
    @Autowired
    public UserController(@Qualifier("UserService") UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/registration/")
    public RequestResponse userRegistration(@RequestBody User newUser){
        try{
        return this.userService.userRegistration(newUser);

        }catch (UsernameExistException usernameExistException){
            return new RequestResponse(newUser, usernameExistException.printException());
        }
    }

    @PutMapping("/login/")
    public RequestResponse userLogin(@RequestBody User userValidation){
        try{
            return this.userService.userLogin(userValidation);
        }catch (NoPasswordException noPasswordException){
            return new RequestResponse(userValidation, noPasswordException.printException());
        }catch (NoUsernameException noUsernameException){
            return new RequestResponse(userValidation, noUsernameException.printException());
        }
    }

    @PutMapping("/usernameUpdate/{newName}/")
    public RequestResponse updateUsername(@PathVariable("newName")String newUsername,@RequestBody User user){
        try{
            return this.userService.usernameUpdate(newUsername,user);
        }catch (NoUsernameException noUsernameException){
            return new RequestResponse(user,noUsernameException.printException());
        }catch (NoUserFoundException noUserFoundException){
            return new RequestResponse(user,noUserFoundException.printException());
        }catch (WrongPasswordException wrongPasswordException){
            return  new RequestResponse(user,wrongPasswordException.printException());
        }catch (NoPasswordException noPasswordException){
            return new RequestResponse(user, noPasswordException.printException());
        }catch (UsernameExistException usernameExistException){
            return new RequestResponse(new User(newUsername), usernameExistException.printException());
        }
    }

    @PutMapping("/passwordUpdate/{username}/")
    public RequestResponse updatePassword(@PathVariable("username") String username,@RequestBody StringUpdate password) {
        try {
            return this.userService.passwordUpdate(username, password);
        } catch (NoUserFoundException noUserFoundException) {
            return new RequestResponse(new User(username, password.getOldOne()), noUserFoundException.printException());
        } catch (WrongPasswordException wrongPasswordException) {
            return new RequestResponse(new User(username, password.getOldOne()), wrongPasswordException.printException());
        } catch (NoPasswordException noPasswordException) {
            return new RequestResponse(new User(username), noPasswordException.printException());
        }
    }
}
