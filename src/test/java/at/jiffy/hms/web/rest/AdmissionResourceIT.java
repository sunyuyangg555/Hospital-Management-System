package at.jiffy.hms.web.rest;

import at.jiffy.hms.HospitalManagementSystemApp;
import at.jiffy.hms.domain.Admission;
import at.jiffy.hms.repository.AdmissionRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AdmissionResource} REST controller.
 */
@SpringBootTest(classes = HospitalManagementSystemApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class AdmissionResourceIT {

    private static final Boolean DEFAULT_IS_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACTIVE = true;

    private static final LocalDate DEFAULT_FROM_DATE_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FROM_DATE_TIME = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_TO_DATE_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TO_DATE_TIME = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AdmissionRepository admissionRepository;

    @Mock
    private AdmissionRepository admissionRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAdmissionMockMvc;

    private Admission admission;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Admission createEntity(EntityManager em) {
        Admission admission = new Admission()
            .isActive(DEFAULT_IS_ACTIVE)
            .fromDateTime(DEFAULT_FROM_DATE_TIME)
            .toDateTime(DEFAULT_TO_DATE_TIME);
        return admission;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Admission createUpdatedEntity(EntityManager em) {
        Admission admission = new Admission()
            .isActive(UPDATED_IS_ACTIVE)
            .fromDateTime(UPDATED_FROM_DATE_TIME)
            .toDateTime(UPDATED_TO_DATE_TIME);
        return admission;
    }

    @BeforeEach
    public void initTest() {
        admission = createEntity(em);
    }

    @Test
    @Transactional
    public void createAdmission() throws Exception {
        int databaseSizeBeforeCreate = admissionRepository.findAll().size();
        // Create the Admission
        restAdmissionMockMvc.perform(post("/api/admissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(admission)))
            .andExpect(status().isCreated());

        // Validate the Admission in the database
        List<Admission> admissionList = admissionRepository.findAll();
        assertThat(admissionList).hasSize(databaseSizeBeforeCreate + 1);
        Admission testAdmission = admissionList.get(admissionList.size() - 1);
        assertThat(testAdmission.isIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
        assertThat(testAdmission.getFromDateTime()).isEqualTo(DEFAULT_FROM_DATE_TIME);
        assertThat(testAdmission.getToDateTime()).isEqualTo(DEFAULT_TO_DATE_TIME);
    }

    @Test
    @Transactional
    public void createAdmissionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = admissionRepository.findAll().size();

        // Create the Admission with an existing ID
        admission.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdmissionMockMvc.perform(post("/api/admissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(admission)))
            .andExpect(status().isBadRequest());

        // Validate the Admission in the database
        List<Admission> admissionList = admissionRepository.findAll();
        assertThat(admissionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkIsActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = admissionRepository.findAll().size();
        // set the field null
        admission.setIsActive(null);

        // Create the Admission, which fails.


        restAdmissionMockMvc.perform(post("/api/admissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(admission)))
            .andExpect(status().isBadRequest());

        List<Admission> admissionList = admissionRepository.findAll();
        assertThat(admissionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFromDateTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = admissionRepository.findAll().size();
        // set the field null
        admission.setFromDateTime(null);

        // Create the Admission, which fails.


        restAdmissionMockMvc.perform(post("/api/admissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(admission)))
            .andExpect(status().isBadRequest());

        List<Admission> admissionList = admissionRepository.findAll();
        assertThat(admissionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAdmissions() throws Exception {
        // Initialize the database
        admissionRepository.saveAndFlush(admission);

        // Get all the admissionList
        restAdmissionMockMvc.perform(get("/api/admissions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(admission.getId().intValue())))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].fromDateTime").value(hasItem(DEFAULT_FROM_DATE_TIME.toString())))
            .andExpect(jsonPath("$.[*].toDateTime").value(hasItem(DEFAULT_TO_DATE_TIME.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllAdmissionsWithEagerRelationshipsIsEnabled() throws Exception {
        when(admissionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAdmissionMockMvc.perform(get("/api/admissions?eagerload=true"))
            .andExpect(status().isOk());

        verify(admissionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAdmissionsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(admissionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAdmissionMockMvc.perform(get("/api/admissions?eagerload=true"))
            .andExpect(status().isOk());

        verify(admissionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getAdmission() throws Exception {
        // Initialize the database
        admissionRepository.saveAndFlush(admission);

        // Get the admission
        restAdmissionMockMvc.perform(get("/api/admissions/{id}", admission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(admission.getId().intValue()))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.fromDateTime").value(DEFAULT_FROM_DATE_TIME.toString()))
            .andExpect(jsonPath("$.toDateTime").value(DEFAULT_TO_DATE_TIME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAdmission() throws Exception {
        // Get the admission
        restAdmissionMockMvc.perform(get("/api/admissions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAdmission() throws Exception {
        // Initialize the database
        admissionRepository.saveAndFlush(admission);

        int databaseSizeBeforeUpdate = admissionRepository.findAll().size();

        // Update the admission
        Admission updatedAdmission = admissionRepository.findById(admission.getId()).get();
        // Disconnect from session so that the updates on updatedAdmission are not directly saved in db
        em.detach(updatedAdmission);
        updatedAdmission
            .isActive(UPDATED_IS_ACTIVE)
            .fromDateTime(UPDATED_FROM_DATE_TIME)
            .toDateTime(UPDATED_TO_DATE_TIME);

        restAdmissionMockMvc.perform(put("/api/admissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAdmission)))
            .andExpect(status().isOk());

        // Validate the Admission in the database
        List<Admission> admissionList = admissionRepository.findAll();
        assertThat(admissionList).hasSize(databaseSizeBeforeUpdate);
        Admission testAdmission = admissionList.get(admissionList.size() - 1);
        assertThat(testAdmission.isIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
        assertThat(testAdmission.getFromDateTime()).isEqualTo(UPDATED_FROM_DATE_TIME);
        assertThat(testAdmission.getToDateTime()).isEqualTo(UPDATED_TO_DATE_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingAdmission() throws Exception {
        int databaseSizeBeforeUpdate = admissionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdmissionMockMvc.perform(put("/api/admissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(admission)))
            .andExpect(status().isBadRequest());

        // Validate the Admission in the database
        List<Admission> admissionList = admissionRepository.findAll();
        assertThat(admissionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAdmission() throws Exception {
        // Initialize the database
        admissionRepository.saveAndFlush(admission);

        int databaseSizeBeforeDelete = admissionRepository.findAll().size();

        // Delete the admission
        restAdmissionMockMvc.perform(delete("/api/admissions/{id}", admission.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Admission> admissionList = admissionRepository.findAll();
        assertThat(admissionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
