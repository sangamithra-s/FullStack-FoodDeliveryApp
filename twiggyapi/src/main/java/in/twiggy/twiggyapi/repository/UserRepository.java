package in.twiggy.twiggyapi.repository;

import in.twiggy.twiggyapi.entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository  extends MongoRepository<UserEntity,String> {
    Optional<UserEntity> findByEmail(String email);
}
