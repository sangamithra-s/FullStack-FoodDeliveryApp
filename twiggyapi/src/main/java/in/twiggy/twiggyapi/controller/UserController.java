package in.twiggy.twiggyapi.controller;


import in.twiggy.twiggyapi.io.UserRequest;
import in.twiggy.twiggyapi.io.UserResponse;
import in.twiggy.twiggyapi.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public UserResponse register(@RequestBody UserRequest userRequest){
        return userService.regiserUser(userRequest);
    }
}
