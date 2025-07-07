package in.twiggy.twiggyapi.service;

import in.twiggy.twiggyapi.io.UserRequest;
import in.twiggy.twiggyapi.io.UserResponse;

public interface UserService {

    UserResponse regiserUser(UserRequest request);

    String FindByUserId();
}
