package at.jiffy.hms.web.rest;

import at.jiffy.hms.HospitalManagementSystemApp;
import at.jiffy.hms.domain.AdmissionVisit;
import at.jiffy.hms.repository.AdmissionVisitRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AdmissionVisitResource} REST controller.
 */
@SpringBootTest(classes = HospitalManagementSystemApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AdmissionVisitResourceIT {

    private static final String DEFAULT_SYMPTOMS = "AAAAAAAAAA";
    private static final String UPDATED_SYMPTOMS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_TIME = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AdmissionVisitRepository admissionVisitRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAdmissionVisitMockMvc;

    private AdmissionVisit admissionVisit;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AdmissionVisit createEntity(EntityManager em) {
        AdmissionVisit admissionVisit = new AdmissionVisit()
            .symptoms(DEFAULT_SYMPTOMS)
            .dateTime(DEFAULT_DATE_TIME);
        return admissionVisit;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AdmissionVisit createUpdatedEntity(EntityManager em) {
        AdmissionVisit admissionVisit = new AdmissionVisit()
            .symptoms(UPDATED_SYMPTOMS)
            .dateTime(UPDATED_DATE_TIME);
        return admissionVisit;
    }

    @BeforeEach
    public void initTest() {
        admissionVisit = createEntity(em);
    }

    @Test
    @Transactional
    public void createAdmissionVisit() throws Exception {
        int databaseSizeBeforeCreate = admissionVisitRepository.findAll().size();
        // Create the AdmissionVisit
        restAdmissionVisitMockMvc.perform(post("/api/admission-visits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(admissionVisit)))
            .andExpect(status().isCreated());

        // Validate the AdmissionVisit in the database
        List<AdmissionVisit> admissionVisitList = admissionVisitRepository.findAll();
        assertThat(admissionVisitList).hasSize(databaseSizeBeforeCreate + 1);
        AdmissionVisit testAdmissionVisit = admissionVisitList.get(admissionVisitList.size() - 1);
        assertThat(testAdmissionVisit.getSymptoms()).isEqualTo(DEFAULT_SYMPTOMS);
        assertThat(testAdmissionVisit.getDateTime()).isEqualTo(DEFAULT_DATE_TIME);
    }

    @Test
    @Transactional
    public void createAdmissionVisitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = admissionVisitRepository.findAll().size();

        // Create the AdmissionVisit with an existing ID
        admissionVisit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdmissionVisitMockMvc.perform(post("/api/admission-visits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(admissionVisit)))
            .andExpect(status().isBadRequest());

        // Validate the AdmissionVisit in the database
        List<AdmissionVisit> admissionVisitList = admissionVisitRepository.findAll();
        assertThat(admissionVisitList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkSymptomsIsRequired() throws Exception {
        int databaseSizeBeforeTest = admissionVisitRepository.findAll().size();
        // set the field null
        admissionVisit.setSymptoms(null);

        // Create the AdmissionVisit, which fails.


        restAdmissionVisitMockMvc.perform(post("/api/admission-visits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(admissionVisit)))
            .andExpect(status().isBadRequest());

        List<AdmissionVisit> admissionVisitList = admissionVisitRepository.findAll();
        assertThat(admissionVisitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAdmissionVisits() throws Exception {
        // Initialize the database
        admissionVisitRepository.saveAndFlush(admissionVisit);

        // Get all the admissionVisitList
        restAdmissionVisitMockMvc.perform(get("/api/admission-visits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(admissionVisit.getId().intValue())))
            .andExpect(jsonPath("$.[*].symptoms").value(hasItem(DEFAULT_SYMPTOMS)))
            .andExpect(jsonPath("$.[*].dateTime").value(hasItem(DEFAULT_DATE_TIME.toString())));
    }
    
    @Test
    @Transactional
    public void getAdmissionVisit() throws Exception {
        // Initialize the database
        admissionVisitRepository.saveAndFlush(admissionVisit);

        // Get the admissionVisit
        restAdmissionVisitMockMvc.perform(get("/api/admission-visits/{id}", admissionVisit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(admissionVisit.getId().intValue()))
            .andExpect(jsonPath("$.symptoms").value(DEFAULT_SYMPTOMS))
            .andExpect(jsonPath("$.dateTime").value(DEFAULT_DATE_TIME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAdmissionVisit() throws Exception {
        // Get the admissionVisit
        restAdmissionVisitMockMvc.perform(get("/api/admission-visits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAdmissionVisit() throws Exception {
        // Initialize the database
        admissionVisitRepository.saveAndFlush(admissionVisit);

        int databaseSizeBeforeUpdate = admissionVisitRepository.findAll().size();

        // Update the admissionVisit
        AdmissionVisit updatedAdmissionVisit = admissionVisitRepository.findById(admissionVisit.getId()).get();
        // Disconnect from session so that the updates on updatedAdmissionVisit are not directly saved in db
        em.detach(updatedAdmissionVisit);
        updatedAdmissionVisit
            .symptoms(UPDATED_SYMPTOMS)
            .dateTime(UPDATED_DATE_TIME);

        restAdmissionVisitMockMvc.perform(put("/api/admission-visits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAdmissionVisit)))
            .andExpect(status().isOk());

        // Validate the AdmissionVisit in the database
        List<AdmissionVisit> admissionVisitList = admissionVisitRepository.findAll();
        assertThat(admissionVisitList).hasSize(databaseSizeBeforeUpdate);
        AdmissionVisit testAdmissionVisit = admissionVisitList.get(admissionVisitList.size() - 1);
        assertThat(testAdmissionVisit.getSymptoms()).isEqualTo(UPDATED_SYMPTOMS);
        assertThat(testAdmissionVisit.getDateTime()).isEqualTo(UPDATED_DATE_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingAdmissionVisit() throws Exception {
        int databaseSizeBeforeUpdate = admissionVisitRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdmissionVisitMockMvc.perform(put("/api/admission-visits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(admissionVisit)))
            .andExpect(status().isBadRequest());

        // Validate the AdmissionVisit in the database
        List<AdmissionVisit> admissionVisitList = admissionVisitRepository.findAll();
        assertThat(admissionVisitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAdmissionVisit() throws Exception {
        // Initialize the database
        admissionVisitRepository.saveAndFlush(admissionVisit);

        int databaseSizeBeforeDelete = admissionVisitRepository.findAll().size();

        // Delete the admissionVisit
        restAdmissionVisitMockMvc.perform(delete("/api/admission-visits/{id}", admissionVisit.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AdmissionVisit> admissionVisitList = admissionVisitRepository.findAll();
        assertThat(admissionVisitList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
