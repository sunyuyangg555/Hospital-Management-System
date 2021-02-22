package at.jiffy.hms.web.rest;

import at.jiffy.hms.domain.MedicineCategory;
import at.jiffy.hms.repository.MedicineCategoryRepository;
import at.jiffy.hms.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link at.jiffy.hms.domain.MedicineCategory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MedicineCategoryResource {

    private final Logger log = LoggerFactory.getLogger(MedicineCategoryResource.class);

    private static final String ENTITY_NAME = "medicineCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MedicineCategoryRepository medicineCategoryRepository;

    public MedicineCategoryResource(MedicineCategoryRepository medicineCategoryRepository) {
        this.medicineCategoryRepository = medicineCategoryRepository;
    }

    /**
     * {@code POST  /medicine-categories} : Create a new medicineCategory.
     *
     * @param medicineCategory the medicineCategory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new medicineCategory, or with status {@code 400 (Bad Request)} if the medicineCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/medicine-categories")
    public ResponseEntity<MedicineCategory> createMedicineCategory(@Valid @RequestBody MedicineCategory medicineCategory) throws URISyntaxException {
        log.debug("REST request to save MedicineCategory : {}", medicineCategory);
        if (medicineCategory.getId() != null) {
            throw new BadRequestAlertException("A new medicineCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedicineCategory result = medicineCategoryRepository.save(medicineCategory);
        return ResponseEntity.created(new URI("/api/medicine-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /medicine-categories} : Updates an existing medicineCategory.
     *
     * @param medicineCategory the medicineCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated medicineCategory,
     * or with status {@code 400 (Bad Request)} if the medicineCategory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the medicineCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/medicine-categories")
    public ResponseEntity<MedicineCategory> updateMedicineCategory(@Valid @RequestBody MedicineCategory medicineCategory) throws URISyntaxException {
        log.debug("REST request to update MedicineCategory : {}", medicineCategory);
        if (medicineCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MedicineCategory result = medicineCategoryRepository.save(medicineCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, medicineCategory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /medicine-categories} : get all the medicineCategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of medicineCategories in body.
     */
    @GetMapping("/medicine-categories")
    public List<MedicineCategory> getAllMedicineCategories() {
        log.debug("REST request to get all MedicineCategories");
        return medicineCategoryRepository.findAll();
    }

    /**
     * {@code GET  /medicine-categories/:id} : get the "id" medicineCategory.
     *
     * @param id the id of the medicineCategory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the medicineCategory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/medicine-categories/{id}")
    public ResponseEntity<MedicineCategory> getMedicineCategory(@PathVariable Long id) {
        log.debug("REST request to get MedicineCategory : {}", id);
        Optional<MedicineCategory> medicineCategory = medicineCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(medicineCategory);
    }

    /**
     * {@code DELETE  /medicine-categories/:id} : delete the "id" medicineCategory.
     *
     * @param id the id of the medicineCategory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/medicine-categories/{id}")
    public ResponseEntity<Void> deleteMedicineCategory(@PathVariable Long id) {
        log.debug("REST request to delete MedicineCategory : {}", id);
        medicineCategoryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
