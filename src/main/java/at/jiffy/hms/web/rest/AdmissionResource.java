package at.jiffy.hms.web.rest;

import at.jiffy.hms.domain.Admission;
import at.jiffy.hms.repository.AdmissionRepository;
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
 * REST controller for managing {@link at.jiffy.hms.domain.Admission}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AdmissionResource {

    private final Logger log = LoggerFactory.getLogger(AdmissionResource.class);

    private static final String ENTITY_NAME = "admission";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AdmissionRepository admissionRepository;

    public AdmissionResource(AdmissionRepository admissionRepository) {
        this.admissionRepository = admissionRepository;
    }

    /**
     * {@code POST  /admissions} : Create a new admission.
     *
     * @param admission the admission to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new admission, or with status {@code 400 (Bad Request)} if the admission has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/admissions")
    public ResponseEntity<Admission> createAdmission(@Valid @RequestBody Admission admission) throws URISyntaxException {
        log.debug("REST request to save Admission : {}", admission);
        if (admission.getId() != null) {
            throw new BadRequestAlertException("A new admission cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Admission result = admissionRepository.save(admission);
        return ResponseEntity.created(new URI("/api/admissions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /admissions} : Updates an existing admission.
     *
     * @param admission the admission to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated admission,
     * or with status {@code 400 (Bad Request)} if the admission is not valid,
     * or with status {@code 500 (Internal Server Error)} if the admission couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/admissions")
    public ResponseEntity<Admission> updateAdmission(@Valid @RequestBody Admission admission) throws URISyntaxException {
        log.debug("REST request to update Admission : {}", admission);
        if (admission.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Admission result = admissionRepository.save(admission);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, admission.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /admissions} : get all the admissions.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of admissions in body.
     */
    @GetMapping("/admissions")
    public List<Admission> getAllAdmissions(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Admissions");
        return admissionRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /admissions/:id} : get the "id" admission.
     *
     * @param id the id of the admission to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the admission, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/admissions/{id}")
    public ResponseEntity<Admission> getAdmission(@PathVariable Long id) {
        log.debug("REST request to get Admission : {}", id);
        Optional<Admission> admission = admissionRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(admission);
    }

    /**
     * {@code DELETE  /admissions/:id} : delete the "id" admission.
     *
     * @param id the id of the admission to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/admissions/{id}")
    public ResponseEntity<Void> deleteAdmission(@PathVariable Long id) {
        log.debug("REST request to delete Admission : {}", id);
        admissionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
