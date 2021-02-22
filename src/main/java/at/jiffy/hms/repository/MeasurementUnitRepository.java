package at.jiffy.hms.repository;

import at.jiffy.hms.domain.MeasurementUnit;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MeasurementUnit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeasurementUnitRepository extends JpaRepository<MeasurementUnit, Long> {
}
