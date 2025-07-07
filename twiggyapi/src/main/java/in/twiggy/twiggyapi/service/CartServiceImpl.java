package in.twiggy.twiggyapi.service;

import in.twiggy.twiggyapi.entity.CartEntity;
import in.twiggy.twiggyapi.io.CartRequest;
import in.twiggy.twiggyapi.io.CartResponse;
import in.twiggy.twiggyapi.repository.CartRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    UserService userService;

    @Override
    public CartResponse addToCart(CartRequest cartRequest) {
            String loggedInUserId = userService.FindByUserId();
            Optional<CartEntity> cartEntityOptional = cartRepository.findByUserId(loggedInUserId);
            CartEntity cart= cartEntityOptional.orElseGet(() ->
                new CartEntity(loggedInUserId,new HashMap<String,Integer>())
            );
            Map<String, Integer> items = cart.getItems();
            items.put(cartRequest.getFoodId(), items.getOrDefault(cartRequest.getFoodId(), 0) + 1);
            cart.setItems(items);
            cartRepository.save(cart);
            return CartResponse.builder()
                    .id(cart.getId())
                    .userId(cart.getUserId())
                    .items(cart.getItems())
                    .build();
    }

    @Override
    public CartResponse getCart() {
        String loggedInUserId = userService.FindByUserId();
        Optional<CartEntity> cartEntityOptional = cartRepository.findByUserId(loggedInUserId);
        if (cartEntityOptional.isPresent()) {
            CartEntity cart = cartEntityOptional.get();
            return CartResponse.builder()
                    .id(cart.getId())
                    .userId(cart.getUserId())
                    .items(cart.getItems())
                    .build();
        } else {
            return CartResponse.builder()
                    .id(null)
                    .userId(loggedInUserId)
                    .items(new HashMap<>())
                    .build();
        }
    }

    @Override
    public CartResponse clearCart() {
        String loggedInUserId = userService.FindByUserId();
        Optional<CartEntity> cartEntityOptional = cartRepository.findByUserId(loggedInUserId);
        if (cartEntityOptional.isPresent()) {
            CartEntity cart = cartEntityOptional.get();
            cart.setItems(new HashMap<>());
            cartRepository.save(cart);
            return CartResponse.builder()
                    .id(cart.getId())
                    .userId(cart.getUserId())
                    .items(cart.getItems())
                    .build();
        } else {
            return CartResponse.builder()
                    .id(null)
                    .userId(loggedInUserId)
                    .items(new HashMap<>())
                    .build();
        }
    }

    @Override
    public CartResponse removeFromCart(String foodId) {
        String loggedInUserId = userService.FindByUserId();
        Optional<CartEntity> cartEntityOptional = cartRepository.findByUserId(loggedInUserId);
        if (cartEntityOptional.isPresent()) {
            CartEntity cart = cartEntityOptional.get();
            Map<String, Integer> items = cart.getItems();
            if (items.containsKey(foodId)) {
                int quantity = items.get(foodId);
                if (quantity > 1) {
                    items.put(foodId, quantity - 1);
                } else {
                    items.remove(foodId);
                }
                cart.setItems(items);
                cartRepository.save(cart);
            }
            return CartResponse.builder()
                    .id(cart.getId())
                    .userId(cart.getUserId())
                    .items(cart.getItems())
                    .build();
        } else {
            return CartResponse.builder()
                    .id(null)
                    .userId(loggedInUserId)
                    .items(new HashMap<>())
                    .build();
        }
    }
}
