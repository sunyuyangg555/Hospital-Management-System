package at.jiffy.hms.web.rest;

import at.jiffy.hms.domain.Diagnosis;
import at.jiffy.hms.repository.DiagnosisRepository;
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
 * REST controller for managing {@link at.jiffy.hms.domain.Diagnosis}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DiagnosisResource {

    private final Logger log = LoggerFactory.getLogger(DiagnosisResource.class);

    private static final String ENTITY_NAME = "diagnosis";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiagnosisRepository diagnosisRepository;

    public DiagnosisResource(DiagnosisRepository diagnosisRepository) {
        this.diagnosisRepository = diagnosisRepository;
    }

    /**
     * {@code POST  /diagnoses} : Create a new diagnosis.
     *
     * @param diagnosis the diagnosis to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new diagnosis, or with status {@code 400 (Bad Request)} if the diagnosis has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/diagnoses")
    public ResponseEntity<Diagnosis> createDiagnosis(@Valid @RequestBody Diagnosis diagnosis) throws URISyntaxException {
        log.debug("REST request to save Diagnosis : {}", diagnosis);
        if (diagnosis.getId() != null) {
            throw new BadRequestAlertException("A new diagnosis cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Diagnosis result = diagnosisRepository.save(diagnosis);
        return ResponseEntity.created(new URI("/api/diagnoses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /diagnoses} : Updates an existing diagnosis.
     *
     * @param diagnosis the diagnosis to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated diagnosis,
     * or with status {@code 400 (Bad Request)} if the diagnosis is not valid,
     * or with status {@code 500 (Internal Server Error)} if the diagnosis couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/diagnoses")
    public ResponseEntity<Diagnosis> updateDiagnosis(@Valid @RequestBody Diagnosis diagnosis) throws URISyntaxException {
        log.debug("REST request to update Diagnosis : {}", diagnosis);
        if (diagnosis.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Diagnosis result = diagnosisRepository.save(diagnosis);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, diagnosis.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /diagnoses} : get all the diagnoses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of diagnoses in body.
     */
    @GetMapping("/diagnoses")
    public List<Diagnosis> getAllDiagnoses() {
        log.debug("REST request to get all Diagnoses");
        return diagnosisRepository.findAll();
    }

    /**
     * {@code GET  /diagnoses/:id} : get the "id" diagnosis.
     *
     * @param id the id of the diagnosis to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the diagnosis, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/diagnoses/{id}")
    public ResponseEntity<Diagnosis> getDiagnosis(@PathVariable Long id) {
        log.debug("REST request to get Diagnosis : {}", id);
        Optional<Diagnosis> diagnosis = diagnosisRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(diagnosis);
    }

    /**
     * {@code DELETE  /diagnoses/:id} : delete the "id" diagnosis.
     *
     * @param id the id of the diagnosis to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/diagnoses/{id}")
    public ResponseEntity<Void> deleteDiagnosis(@PathVariable Long id) {
        log.debug("REST request to delete Diagnosis : {}", id);
        diagnosisRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
