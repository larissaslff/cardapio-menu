package com.example.cardapio.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.cardapio.models.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    
}
