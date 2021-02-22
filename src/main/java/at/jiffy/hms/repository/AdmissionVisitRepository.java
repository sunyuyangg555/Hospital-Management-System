package at.jiffy.hms.repository;

import at.jiffy.hms.domain.AdmissionVisit;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AdmissionVisit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdmissionVisitRepository extends JpaRepository<AdmissionVisit, Long> {
}
