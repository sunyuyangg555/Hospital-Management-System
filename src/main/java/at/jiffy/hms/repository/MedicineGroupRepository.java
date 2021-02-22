package at.jiffy.hms.repository;

import at.jiffy.hms.domain.MedicineGroup;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MedicineGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedicineGroupRepository extends JpaRepository<MedicineGroup, Long> {
}
