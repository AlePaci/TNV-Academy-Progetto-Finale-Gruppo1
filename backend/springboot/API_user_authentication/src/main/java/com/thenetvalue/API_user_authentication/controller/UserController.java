package com.thenetvalue.API_user_authentication.controller;

import com.thenetvalue.API_user_authentication.model.StringUpdate;
import com.thenetvalue.API_user_authentication.model.User;
import com.thenetvalue.API_user_authentication.model.exceptions.*;
import com.thenetvalue.API_user_authentication.model.UserRequestResponse;
import com.thenetvalue.API_user_authentication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    UserService userService;
    @Autowired
    public UserController(@Qualifier("UserService") UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/registration/")
    public UserRequestResponse userRegistration(@RequestBody User newUser){
        try{
        return this.userService.userRegistration(newUser);

        }catch (UsernameExistException usernameExistException){
            return new UserRequestResponse(newUser, usernameExistException.printException());
        }
    }

    @PutMapping("/login/")
    public UserRequestResponse userLogin(@RequestBody User userValidation){
        try{
            return this.userService.userLogin(userValidation);
        }catch (NoPasswordException noPasswordException){
            return new UserRequestResponse(userValidation, noPasswordException.printException());
        }catch (NoUsernameException noUsernameException){
            return new UserRequestResponse(userValidation, noUsernameException.printException());
        }
    }

    @PutMapping("/usernameUpdate/{newName}/")
    public UserRequestResponse updateUsername(@PathVariable("newName")String newUsername, @RequestBody User user){
        try{
            return this.userService.usernameUpdate(newUsername,user);
        }catch (NoUsernameException noUsernameException){
            return new UserRequestResponse(user,noUsernameException.printException());
        }catch (NoUserFoundException noUserFoundException){
            return new UserRequestResponse(user,noUserFoundException.printException());
        }catch (WrongPasswordException wrongPasswordException){
            return  new UserRequestResponse(user,wrongPasswordException.printException());
        }catch (NoPasswordException noPasswordException){
            return new UserRequestResponse(user, noPasswordException.printException());
        }catch (UsernameExistException usernameExistException){
            return new UserRequestResponse(new User(newUsername), usernameExistException.printException());
        }
    }

    @PutMapping("/passwordUpdate/{username}/")
    public UserRequestResponse updatePassword(@PathVariable("username") String username, @RequestBody StringUpdate password) {
        try {
            return this.userService.passwordUpdate(username, password);
        } catch (NoUserFoundException noUserFoundException) {
            return new UserRequestResponse(new User(username, password.getOldOne()), noUserFoundException.printException());
        } catch (WrongPasswordException wrongPasswordException) {
            return new UserRequestResponse(new User(username, password.getOldOne()), wrongPasswordException.printException());
        } catch (NoPasswordException noPasswordException) {
            return new UserRequestResponse(new User(username), noPasswordException.printException());
        }
    }

    @GetMapping("/users")
    public Iterable<User> getAllUsers(){
        return this.userService.getAllUsers();
    }

    @GetMapping("/users/{userId}")
    public User getUserById(@PathVariable("userId")  int userId){
        return this.userService.getUsersById(userId);
    }

    @DeleteMapping("/users/{userId}")
    public String deleteUser(@PathVariable("userId") int userId){
        this.userService.deleteUserById(userId);
        return "USER_DELETE";
    }
    @GetMapping("/username/{name}")
    public UserRequestResponse getUserByUsername(@PathVariable("name")String name){
        try {
            return new UserRequestResponse(this.userService.getUserByUsername(name),"USER_FOUND");
        }
        catch(NoUserFoundException e){
            return new UserRequestResponse(new User(name),e.printException());
        }

    }



}
