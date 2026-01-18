package com.varol.WellPass_Mananagement_System.implementation.organization;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.varol.WellPass_Mananagement_System.exception.custom.DuplicateResourceException;
import com.varol.WellPass_Mananagement_System.exception.custom.ResourceNotFoundException;
import com.varol.WellPass_Mananagement_System.model.organization.ServiceProvider;
import com.varol.WellPass_Mananagement_System.repository.organization.ServiceProviderRepository;
import com.varol.WellPass_Mananagement_System.service.organization.ServiceProviderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceProviderServiceImpl implements ServiceProviderService {

    private final ServiceProviderRepository serviceProviderRepository;

    @Override
    @Transactional
    public ServiceProvider createServiceProvider(ServiceProvider serviceProvider) {
        if (serviceProviderRepository.existsByProviderName(serviceProvider.getProviderName())) {
            throw new DuplicateResourceException("Provider name already exists: " + serviceProvider.getProviderName());
        }

        String providerCode = generateProviderCode(serviceProvider.getProviderName());
        serviceProvider.setProviderCode(providerCode);
        serviceProvider.setIsActive(true);

        return serviceProviderRepository.save(serviceProvider);
    }

    private String generateProviderCode(String providerName) {
        String prefix = providerName.replaceAll("[^A-Za-z0-9]", "")
                .toUpperCase()
                .substring(0, Math.min(3, providerName.length()));

        String uniqueCode;
        do {
            String randomPart = UUID.randomUUID().toString().substring(0, 5).toUpperCase();
            uniqueCode = prefix + "-" + randomPart;
        } while (serviceProviderRepository.existsByProviderCode(uniqueCode));

        return uniqueCode;
    }

    @Override
    @Transactional
    public ServiceProvider updateServiceProvider(Long providerId, ServiceProvider serviceProvider) {
        ServiceProvider existing = getServiceProviderById(providerId);

        if (serviceProvider.getProviderName() != null) {
            existing.setProviderName(serviceProvider.getProviderName());
        }
        if (serviceProvider.getServiceType() != null) {
            existing.setServiceType(serviceProvider.getServiceType());
        }
        if (serviceProvider.getAddress() != null) {
            existing.setAddress(serviceProvider.getAddress());
        }
        if (serviceProvider.getPhoneNumber() != null) {
            existing.setPhoneNumber(serviceProvider.getPhoneNumber());
        }
        if (serviceProvider.getEmail() != null) {
            existing.setEmail(serviceProvider.getEmail());
        }
        if (serviceProvider.getLogoUrl() != null) {
            existing.setLogoUrl(serviceProvider.getLogoUrl());
        }
        if (serviceProvider.getOperatingHours() != null) {
            existing.setOperatingHours(serviceProvider.getOperatingHours());
        }
        if (serviceProvider.getCapacity() != null) {
            existing.setCapacity(serviceProvider.getCapacity());
        }
        if (serviceProvider.getPricePerVisit() != null) {
            existing.setPricePerVisit(serviceProvider.getPricePerVisit());
        }
        if (serviceProvider.getDescription() != null) {
            existing.setDescription(serviceProvider.getDescription());
        }
        if (serviceProvider.getBranchLocation() != null) {
            existing.setBranchLocation(serviceProvider.getBranchLocation());
        }

        return serviceProviderRepository.save(existing);
    }

    @Override
    public ServiceProvider getServiceProviderById(Long providerId) {
        return serviceProviderRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("Service provider not found"));
    }

    @Override
    public ServiceProvider getServiceProviderByCode(String providerCode) {
        return serviceProviderRepository.findByProviderCode(providerCode)
                .orElseThrow(() -> new ResourceNotFoundException("Service provider not found with code: " + providerCode));
    }

    @Override
    public List<ServiceProvider> getAllActiveServiceProviders() {
        return serviceProviderRepository.findByIsActive(true);
    }

    @Override
    public List<ServiceProvider> getServiceProvidersByLocation(String location) {
        return serviceProviderRepository.findByBranchLocation(location);
    }

    @Override
    @Transactional
    public void deactivateServiceProvider(Long providerId) {
        ServiceProvider provider = getServiceProviderById(providerId);
        provider.setIsActive(false);
        serviceProviderRepository.save(provider);
    }

    @Override
    @Transactional
    public void activateServiceProvider(Long providerId) {
        ServiceProvider provider = getServiceProviderById(providerId);
        provider.setIsActive(true);
        serviceProviderRepository.save(provider);
    }

    @Override
    @Transactional
    public void deleteServiceProvider(Long providerId) {
        ServiceProvider provider = getServiceProviderById(providerId);
        serviceProviderRepository.delete(provider);
    }

    @Override
    public boolean existsByProviderCode(String providerCode) {
        return serviceProviderRepository.existsByProviderCode(providerCode);
    }
}