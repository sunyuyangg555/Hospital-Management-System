package at.jiffy.hms.repository;

import at.jiffy.hms.domain.MedicineCategory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MedicineCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedicineCategoryRepository extends JpaRepository<MedicineCategory, Long> {
}
