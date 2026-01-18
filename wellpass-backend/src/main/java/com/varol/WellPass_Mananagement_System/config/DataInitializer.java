package com.varol.WellPass_Mananagement_System.config;

import com.varol.WellPass_Mananagement_System.model.user.Role;
import com.varol.WellPass_Mananagement_System.model.user.User;
import com.varol.WellPass_Mananagement_System.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        createSuperAdminIfNotExists();
    }

    private void createSuperAdminIfNotExists() {
        String superAdminEmail = "novemba42@gmail.com";

        if (userRepository.findByEmail(superAdminEmail).isEmpty()) {
            User superAdmin = new User();
            superAdmin.setEmail(superAdminEmail);
            superAdmin.setPassword(passwordEncoder.encode("SuperAdmin@2025"));
            superAdmin.setFullName("System Administrator");
            superAdmin.setPhoneNumber("+250788000000");
            superAdmin.setRole(Role.SUPER_ADMIN);
            superAdmin.setIsEmailVerified(true);
            superAdmin.setIsActive(true);

            userRepository.save(superAdmin);
            log.info("✅ Super Admin created successfully!");
            log.info("Email: {}", superAdminEmail);
            log.info("Password: SuperAdmin@2025");
            log.info("⚠️  PLEASE CHANGE THE PASSWORD IMMEDIATELY AFTER FIRST LOGIN!");
        } else {
            log.info("ℹ️  Super Admin already exists. Skipping creation.");
        }
    }
}