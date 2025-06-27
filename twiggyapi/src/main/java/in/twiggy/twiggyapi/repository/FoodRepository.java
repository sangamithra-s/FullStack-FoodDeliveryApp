package in.twiggy.twiggyapi.repository;

import in.twiggy.twiggyapi.entity.FoodEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FoodRepository extends MongoRepository<FoodEntity,String> {

}
