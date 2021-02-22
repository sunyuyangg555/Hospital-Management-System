package at.jiffy.hms.repository;

import at.jiffy.hms.domain.Admission;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Admission entity.
 */
@Repository
public interface AdmissionRepository extends JpaRepository<Admission, Long> {

    @Query(value = "select distinct admission from Admission admission left join fetch admission.beds",
        countQuery = "select count(distinct admission) from Admission admission")
    Page<Admission> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct admission from Admission admission left join fetch admission.beds")
    List<Admission> findAllWithEagerRelationships();

    @Query("select admission from Admission admission left join fetch admission.beds where admission.id =:id")
    Optional<Admission> findOneWithEagerRelationships(@Param("id") Long id);
}
