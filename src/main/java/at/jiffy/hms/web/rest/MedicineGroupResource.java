package at.jiffy.hms.web.rest;

import at.jiffy.hms.domain.MedicineGroup;
import at.jiffy.hms.repository.MedicineGroupRepository;
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
 * REST controller for managing {@link at.jiffy.hms.domain.MedicineGroup}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MedicineGroupResource {

    private final Logger log = LoggerFactory.getLogger(MedicineGroupResource.class);

    private static final String ENTITY_NAME = "medicineGroup";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MedicineGroupRepository medicineGroupRepository;

    public MedicineGroupResource(MedicineGroupRepository medicineGroupRepository) {
        this.medicineGroupRepository = medicineGroupRepository;
    }

    /**
     * {@code POST  /medicine-groups} : Create a new medicineGroup.
     *
     * @param medicineGroup the medicineGroup to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new medicineGroup, or with status {@code 400 (Bad Request)} if the medicineGroup has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/medicine-groups")
    public ResponseEntity<MedicineGroup> createMedicineGroup(@Valid @RequestBody MedicineGroup medicineGroup) throws URISyntaxException {
        log.debug("REST request to save MedicineGroup : {}", medicineGroup);
        if (medicineGroup.getId() != null) {
            throw new BadRequestAlertException("A new medicineGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedicineGroup result = medicineGroupRepository.save(medicineGroup);
        return ResponseEntity.created(new URI("/api/medicine-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /medicine-groups} : Updates an existing medicineGroup.
     *
     * @param medicineGroup the medicineGroup to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated medicineGroup,
     * or with status {@code 400 (Bad Request)} if the medicineGroup is not valid,
     * or with status {@code 500 (Internal Server Error)} if the medicineGroup couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/medicine-groups")
    public ResponseEntity<MedicineGroup> updateMedicineGroup(@Valid @RequestBody MedicineGroup medicineGroup) throws URISyntaxException {
        log.debug("REST request to update MedicineGroup : {}", medicineGroup);
        if (medicineGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MedicineGroup result = medicineGroupRepository.save(medicineGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, medicineGroup.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /medicine-groups} : get all the medicineGroups.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of medicineGroups in body.
     */
    @GetMapping("/medicine-groups")
    public List<MedicineGroup> getAllMedicineGroups() {
        log.debug("REST request to get all MedicineGroups");
        return medicineGroupRepository.findAll();
    }

    /**
     * {@code GET  /medicine-groups/:id} : get the "id" medicineGroup.
     *
     * @param id the id of the medicineGroup to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the medicineGroup, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/medicine-groups/{id}")
    public ResponseEntity<MedicineGroup> getMedicineGroup(@PathVariable Long id) {
        log.debug("REST request to get MedicineGroup : {}", id);
        Optional<MedicineGroup> medicineGroup = medicineGroupRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(medicineGroup);
    }

    /**
     * {@code DELETE  /medicine-groups/:id} : delete the "id" medicineGroup.
     *
     * @param id the id of the medicineGroup to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/medicine-groups/{id}")
    public ResponseEntity<Void> deleteMedicineGroup(@PathVariable Long id) {
        log.debug("REST request to delete MedicineGroup : {}", id);
        medicineGroupRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
