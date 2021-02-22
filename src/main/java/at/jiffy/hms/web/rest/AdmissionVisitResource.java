package at.jiffy.hms.web.rest;

import at.jiffy.hms.domain.AdmissionVisit;
import at.jiffy.hms.repository.AdmissionVisitRepository;
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
 * REST controller for managing {@link at.jiffy.hms.domain.AdmissionVisit}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AdmissionVisitResource {

    private final Logger log = LoggerFactory.getLogger(AdmissionVisitResource.class);

    private static final String ENTITY_NAME = "admissionVisit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AdmissionVisitRepository admissionVisitRepository;

    public AdmissionVisitResource(AdmissionVisitRepository admissionVisitRepository) {
        this.admissionVisitRepository = admissionVisitRepository;
    }

    /**
     * {@code POST  /admission-visits} : Create a new admissionVisit.
     *
     * @param admissionVisit the admissionVisit to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new admissionVisit, or with status {@code 400 (Bad Request)} if the admissionVisit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/admission-visits")
    public ResponseEntity<AdmissionVisit> createAdmissionVisit(@Valid @RequestBody AdmissionVisit admissionVisit) throws URISyntaxException {
        log.debug("REST request to save AdmissionVisit : {}", admissionVisit);
        if (admissionVisit.getId() != null) {
            throw new BadRequestAlertException("A new admissionVisit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AdmissionVisit result = admissionVisitRepository.save(admissionVisit);
        return ResponseEntity.created(new URI("/api/admission-visits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /admission-visits} : Updates an existing admissionVisit.
     *
     * @param admissionVisit the admissionVisit to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated admissionVisit,
     * or with status {@code 400 (Bad Request)} if the admissionVisit is not valid,
     * or with status {@code 500 (Internal Server Error)} if the admissionVisit couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/admission-visits")
    public ResponseEntity<AdmissionVisit> updateAdmissionVisit(@Valid @RequestBody AdmissionVisit admissionVisit) throws URISyntaxException {
        log.debug("REST request to update AdmissionVisit : {}", admissionVisit);
        if (admissionVisit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AdmissionVisit result = admissionVisitRepository.save(admissionVisit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, admissionVisit.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /admission-visits} : get all the admissionVisits.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of admissionVisits in body.
     */
    @GetMapping("/admission-visits")
    public List<AdmissionVisit> getAllAdmissionVisits() {
        log.debug("REST request to get all AdmissionVisits");
        return admissionVisitRepository.findAll();
    }

    /**
     * {@code GET  /admission-visits/:id} : get the "id" admissionVisit.
     *
     * @param id the id of the admissionVisit to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the admissionVisit, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/admission-visits/{id}")
    public ResponseEntity<AdmissionVisit> getAdmissionVisit(@PathVariable Long id) {
        log.debug("REST request to get AdmissionVisit : {}", id);
        Optional<AdmissionVisit> admissionVisit = admissionVisitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(admissionVisit);
    }

    /**
     * {@code DELETE  /admission-visits/:id} : delete the "id" admissionVisit.
     *
     * @param id the id of the admissionVisit to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/admission-visits/{id}")
    public ResponseEntity<Void> deleteAdmissionVisit(@PathVariable Long id) {
        log.debug("REST request to delete AdmissionVisit : {}", id);
        admissionVisitRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
