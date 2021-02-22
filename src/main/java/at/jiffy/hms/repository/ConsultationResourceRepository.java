package at.jiffy.hms.repository;

import at.jiffy.hms.domain.ConsultationResource;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ConsultationResource entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsultationResourceRepository extends JpaRepository<ConsultationResource, Long> {
}
