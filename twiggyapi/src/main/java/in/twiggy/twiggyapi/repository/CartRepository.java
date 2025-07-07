package in.twiggy.twiggyapi.repository;


import in.twiggy.twiggyapi.entity.CartEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends MongoRepository<CartEntity,String> {


    Optional<CartEntity> findByUserId(String s);

    void deleteByUserId(String userId);


}
