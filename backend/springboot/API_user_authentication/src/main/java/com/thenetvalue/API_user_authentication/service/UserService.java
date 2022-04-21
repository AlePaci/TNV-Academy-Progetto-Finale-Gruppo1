package com.thenetvalue.API_user_authentication.service;

import com.thenetvalue.API_user_authentication.DAO.UserRepositoryDAO;
import com.thenetvalue.API_user_authentication.model.StringUpdate;
import com.thenetvalue.API_user_authentication.model.exceptions.*;
import com.thenetvalue.API_user_authentication.model.User;
import com.thenetvalue.API_user_authentication.model.RequestResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service("UserService")
public class UserService {
    UserRepositoryDAO userRepositoryDAO;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(@Qualifier("UserDAO") UserRepositoryDAO userRepositoryDAO) {
        this.userRepositoryDAO = userRepositoryDAO;
    }

    public RequestResponse userRegistration(User newUser) {
        if (newUser.getUsername() != null && newUser.getPassword() != null) {
            if (this.userRepositoryDAO.findByUsername(newUser.getUsername()) == null) {
                newUser.setEnabled((byte) 1);
                newUser.setAuthority("ROLE_USER");
                newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
                return new RequestResponse(this.userRepositoryDAO.save(newUser), "REGISTRATION_COMPLETE");
            } else {
                throw new UsernameExistException();
            }
        } else {
            if (newUser.getUsername() == null) {
                throw new NoUsernameException();
            }
            if (newUser.getPassword() == null) {
                throw new NoPasswordException();
            }
        }
        return new RequestResponse(newUser, "REGISTRATION_ERR");
    }

    public RequestResponse userLogin(User userValidation) {
        if (userValidation.getPassword() != null && userValidation.getUsername() != null) {
            User userCredentials = userRepositoryDAO.findByUsername(userValidation.getUsername());
            if (passwordEncoder.matches(userValidation.getPassword(), userCredentials.getPassword())) {
                return new RequestResponse(userCredentials, "LOGIN");
            } else {
                throw new WrongPasswordException();
            }
        } else {
            if (userValidation.getUsername() == null) {
                throw new NoUsernameException();
            }
            if (userValidation.getPassword() == null) {
                throw new NoPasswordException();
            }
            return new RequestResponse(userValidation, "LOGIN_ERR");
        }
    }

    public RequestResponse passwordUpdate(String username, StringUpdate password) {
        if (username != null && password.getNewOne() != null && password.getOldOne() != null) {
            if (this.userRepositoryDAO.findByUsername(username) != null) {
                User userCredentials = this.userRepositoryDAO.findByUsername(username);
                if (passwordEncoder.matches(password.getOldOne(), userCredentials.getPassword())) {
                    this.userRepositoryDAO.updatePasswordByUsername(username, passwordEncoder.encode(password.getNewOne()));
                    return new RequestResponse(this.userRepositoryDAO.findByUsername(username), "UPDATE_SUCESSFUL");
                } else {
                    throw new WrongPasswordException();
                }
            } else {
                throw new NoUserFoundException();
            }
        }else {
            if (password.getOldOne() == null || password.getNewOne() == null)
                throw new NoPasswordException();
        }
        return new RequestResponse(new User(username,password.getOldOne()),"UPDATE_ERR");
    }

    /**
     *
     * @param newUsername
     * @param user
     * @return
     */
    public RequestResponse usernameUpdate( String newUsername, User user){
        if(newUsername !=null && user.getUsername() != null && user.getPassword() != null){
            if(this.userRepositoryDAO.findByUsername(user.getUsername())!= null){
                User userCredentials = this.userRepositoryDAO.findByUsername(user.getUsername());
                if(passwordEncoder.matches(user.getPassword(),userCredentials.getPassword())){
                    if(this.userRepositoryDAO.findByUsername(newUsername) == null){
                        this.userRepositoryDAO.updateUsernameByUsername(newUsername,user.getUsername());
                        return new RequestResponse(this.userRepositoryDAO.findByUsername(newUsername),"UPDATE_SUCESSFUL");
                    }else{
                        throw new UsernameExistException();
                    }
                }else{
                    throw new WrongPasswordException();
                }
            }else{
                throw new NoUserFoundException();
            }
        }
        if(user.getUsername()==null) {
            throw new NoUsernameException();
        }
        if(user.getPassword()==null){
            throw new NoPasswordException();
        }
        return new RequestResponse(user,"UPDATE_ERR");
    }
}
