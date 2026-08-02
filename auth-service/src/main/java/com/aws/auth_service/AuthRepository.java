package com.aws.auth_service;

 
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<Users,Integer>{

    Optional<Users> findByEmail(String email);
}
