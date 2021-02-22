package at.jiffy.hms.config;

import io.github.jhipster.config.JHipsterProperties;
import io.github.jhipster.config.cache.PrefixedKeyGenerator;
import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {
    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, at.jiffy.hms.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, at.jiffy.hms.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, at.jiffy.hms.domain.User.class.getName());
            createCache(cm, at.jiffy.hms.domain.Authority.class.getName());
            createCache(cm, at.jiffy.hms.domain.User.class.getName() + ".authorities");
            createCache(cm, at.jiffy.hms.domain.Transactions.class.getName());
            createCache(cm, at.jiffy.hms.domain.MedicalService.class.getName());
            createCache(cm, at.jiffy.hms.domain.MedicalService.class.getName() + ".transcations");
            createCache(cm, at.jiffy.hms.domain.Department.class.getName());
            createCache(cm, at.jiffy.hms.domain.Department.class.getName() + ".children");
            createCache(cm, at.jiffy.hms.domain.Department.class.getName() + ".staffs");
            createCache(cm, at.jiffy.hms.domain.Department.class.getName() + ".transactions");
            createCache(cm, at.jiffy.hms.domain.ConsultationResource.class.getName());
            createCache(cm, at.jiffy.hms.domain.ConsultationResource.class.getName() + ".diagnoses");
            createCache(cm, at.jiffy.hms.domain.ConsultationResource.class.getName() + ".admissions");
            createCache(cm, at.jiffy.hms.domain.ConsultationResource.class.getName() + ".transactions");
            createCache(cm, at.jiffy.hms.domain.Medicine.class.getName());
            createCache(cm, at.jiffy.hms.domain.Medicine.class.getName() + ".transactions");
            createCache(cm, at.jiffy.hms.domain.Staff.class.getName());
            createCache(cm, at.jiffy.hms.domain.Staff.class.getName() + ".services");
            createCache(cm, at.jiffy.hms.domain.Patient.class.getName());
            createCache(cm, at.jiffy.hms.domain.Patient.class.getName() + ".consulatationResources");
            createCache(cm, at.jiffy.hms.domain.Diagnosis.class.getName());
            createCache(cm, at.jiffy.hms.domain.Admission.class.getName());
            createCache(cm, at.jiffy.hms.domain.Admission.class.getName() + ".visits");
            createCache(cm, at.jiffy.hms.domain.Admission.class.getName() + ".beds");
            createCache(cm, at.jiffy.hms.domain.MedicineGroup.class.getName());
            createCache(cm, at.jiffy.hms.domain.MedicineGroup.class.getName() + ".medicines");
            createCache(cm, at.jiffy.hms.domain.MedicineCategory.class.getName());
            createCache(cm, at.jiffy.hms.domain.MedicineCategory.class.getName() + ".medicines");
            createCache(cm, at.jiffy.hms.domain.Bed.class.getName());
            createCache(cm, at.jiffy.hms.domain.Bed.class.getName() + ".admissions");
            createCache(cm, at.jiffy.hms.domain.AdmissionVisit.class.getName());
            createCache(cm, at.jiffy.hms.domain.Ward.class.getName());
            createCache(cm, at.jiffy.hms.domain.Ward.class.getName() + ".beds");
            createCache(cm, at.jiffy.hms.domain.MeasurementUnit.class.getName());
            createCache(cm, at.jiffy.hms.domain.MeasurementUnit.class.getName() + ".medicineCategories");
            createCache(cm, at.jiffy.hms.domain.Role.class.getName());
            createCache(cm, at.jiffy.hms.domain.Role.class.getName() + ".privileges");
            createCache(cm, at.jiffy.hms.domain.Privilege.class.getName());
            createCache(cm, at.jiffy.hms.domain.Privilege.class.getName() + ".roles");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
