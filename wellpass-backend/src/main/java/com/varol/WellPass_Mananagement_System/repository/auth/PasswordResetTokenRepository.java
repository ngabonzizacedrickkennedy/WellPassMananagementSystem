package com.varol.WellPass_Mananagement_System.repository.auth;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.varol.WellPass_Mananagement_System.model.auth.PasswordResetToken;
import com.varol.WellPass_Mananagement_System.model.user.User;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);

    Optional<PasswordResetToken> findByUserAndUsedFalseAndExpiryDateAfter(User user, LocalDateTime currentDate);

    void deleteByExpiryDateBefore(LocalDateTime currentDate);

    void deleteByUser(User user);
}