package at.jiffy.hms.repository;

import at.jiffy.hms.domain.MedicalService;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MedicalService entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedicalServiceRepository extends JpaRepository<MedicalService, Long> {
}
