package in.twiggy.twiggyapi.controller;


import in.twiggy.twiggyapi.io.CartRequest;
import in.twiggy.twiggyapi.io.CartResponse;
import in.twiggy.twiggyapi.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartController {


    @Autowired
    CartService cartService;

    @PostMapping
    public CartResponse addToCart(@RequestBody CartRequest request) {
        String foodId = request.getFoodId();
        if (foodId == null || foodId.isEmpty()) {
            throw new IllegalArgumentException("Food ID must not be null or empty");
        }
        return cartService.addToCart(request);

    }
    @GetMapping("/get")
    public CartResponse getCart() {
        CartResponse cartResponse = cartService.getCart();
        if (cartResponse.getItems() == null || cartResponse.getItems().isEmpty()) {
            throw new IllegalArgumentException("Cart is empty");
        }
        return cartResponse;
    }

    @DeleteMapping("/clear")
    public CartResponse clearCart() {
        CartResponse cartResponse = cartService.clearCart();
        return cartResponse;
    }

    @DeleteMapping("/remove/{foodId}")
    public CartResponse removeFromCart(@PathVariable String foodId) {
        if (foodId == null || foodId.isEmpty()) {
            throw new IllegalArgumentException("Food ID must not be null or empty");
        }
        CartResponse cartResponse = cartService.removeFromCart(foodId);
        return cartResponse;
    }
}
