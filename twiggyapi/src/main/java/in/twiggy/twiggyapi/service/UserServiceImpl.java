package in.twiggy.twiggyapi.service;


import in.twiggy.twiggyapi.entity.UserEntity;
import in.twiggy.twiggyapi.io.UserRequest;
import in.twiggy.twiggyapi.io.UserResponse;
import in.twiggy.twiggyapi.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;


    @Override
    public UserResponse regiserUser(UserRequest request) {
       UserEntity newUser= convertToEntity(request);
       newUser=userRepository.save(newUser);
       UserResponse userResponse=convertToResponse(newUser);
       return userResponse;
    }

    private UserEntity convertToEntity(UserRequest request){
            return UserEntity.builder()
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .name(request.getName())
                    .build();
    }

    private UserResponse convertToResponse(UserEntity registeredUser){
        return UserResponse.builder()
                .id(registeredUser.getId())
                .email(registeredUser.getEmail())
                .name(registeredUser.getName())
                .build();

    }
}
