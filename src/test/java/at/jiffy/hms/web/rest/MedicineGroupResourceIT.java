package at.jiffy.hms.web.rest;

import at.jiffy.hms.HospitalManagementSystemApp;
import at.jiffy.hms.domain.MedicineGroup;
import at.jiffy.hms.repository.MedicineGroupRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MedicineGroupResource} REST controller.
 */
@SpringBootTest(classes = HospitalManagementSystemApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MedicineGroupResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTIONS = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTIONS = "BBBBBBBBBB";

    @Autowired
    private MedicineGroupRepository medicineGroupRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMedicineGroupMockMvc;

    private MedicineGroup medicineGroup;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedicineGroup createEntity(EntityManager em) {
        MedicineGroup medicineGroup = new MedicineGroup()
            .name(DEFAULT_NAME)
            .descriptions(DEFAULT_DESCRIPTIONS);
        return medicineGroup;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedicineGroup createUpdatedEntity(EntityManager em) {
        MedicineGroup medicineGroup = new MedicineGroup()
            .name(UPDATED_NAME)
            .descriptions(UPDATED_DESCRIPTIONS);
        return medicineGroup;
    }

    @BeforeEach
    public void initTest() {
        medicineGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedicineGroup() throws Exception {
        int databaseSizeBeforeCreate = medicineGroupRepository.findAll().size();
        // Create the MedicineGroup
        restMedicineGroupMockMvc.perform(post("/api/medicine-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicineGroup)))
            .andExpect(status().isCreated());

        // Validate the MedicineGroup in the database
        List<MedicineGroup> medicineGroupList = medicineGroupRepository.findAll();
        assertThat(medicineGroupList).hasSize(databaseSizeBeforeCreate + 1);
        MedicineGroup testMedicineGroup = medicineGroupList.get(medicineGroupList.size() - 1);
        assertThat(testMedicineGroup.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMedicineGroup.getDescriptions()).isEqualTo(DEFAULT_DESCRIPTIONS);
    }

    @Test
    @Transactional
    public void createMedicineGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medicineGroupRepository.findAll().size();

        // Create the MedicineGroup with an existing ID
        medicineGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedicineGroupMockMvc.perform(post("/api/medicine-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicineGroup)))
            .andExpect(status().isBadRequest());

        // Validate the MedicineGroup in the database
        List<MedicineGroup> medicineGroupList = medicineGroupRepository.findAll();
        assertThat(medicineGroupList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = medicineGroupRepository.findAll().size();
        // set the field null
        medicineGroup.setName(null);

        // Create the MedicineGroup, which fails.


        restMedicineGroupMockMvc.perform(post("/api/medicine-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicineGroup)))
            .andExpect(status().isBadRequest());

        List<MedicineGroup> medicineGroupList = medicineGroupRepository.findAll();
        assertThat(medicineGroupList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionsIsRequired() throws Exception {
        int databaseSizeBeforeTest = medicineGroupRepository.findAll().size();
        // set the field null
        medicineGroup.setDescriptions(null);

        // Create the MedicineGroup, which fails.


        restMedicineGroupMockMvc.perform(post("/api/medicine-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicineGroup)))
            .andExpect(status().isBadRequest());

        List<MedicineGroup> medicineGroupList = medicineGroupRepository.findAll();
        assertThat(medicineGroupList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMedicineGroups() throws Exception {
        // Initialize the database
        medicineGroupRepository.saveAndFlush(medicineGroup);

        // Get all the medicineGroupList
        restMedicineGroupMockMvc.perform(get("/api/medicine-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medicineGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].descriptions").value(hasItem(DEFAULT_DESCRIPTIONS)));
    }
    
    @Test
    @Transactional
    public void getMedicineGroup() throws Exception {
        // Initialize the database
        medicineGroupRepository.saveAndFlush(medicineGroup);

        // Get the medicineGroup
        restMedicineGroupMockMvc.perform(get("/api/medicine-groups/{id}", medicineGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(medicineGroup.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.descriptions").value(DEFAULT_DESCRIPTIONS));
    }
    @Test
    @Transactional
    public void getNonExistingMedicineGroup() throws Exception {
        // Get the medicineGroup
        restMedicineGroupMockMvc.perform(get("/api/medicine-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedicineGroup() throws Exception {
        // Initialize the database
        medicineGroupRepository.saveAndFlush(medicineGroup);

        int databaseSizeBeforeUpdate = medicineGroupRepository.findAll().size();

        // Update the medicineGroup
        MedicineGroup updatedMedicineGroup = medicineGroupRepository.findById(medicineGroup.getId()).get();
        // Disconnect from session so that the updates on updatedMedicineGroup are not directly saved in db
        em.detach(updatedMedicineGroup);
        updatedMedicineGroup
            .name(UPDATED_NAME)
            .descriptions(UPDATED_DESCRIPTIONS);

        restMedicineGroupMockMvc.perform(put("/api/medicine-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedicineGroup)))
            .andExpect(status().isOk());

        // Validate the MedicineGroup in the database
        List<MedicineGroup> medicineGroupList = medicineGroupRepository.findAll();
        assertThat(medicineGroupList).hasSize(databaseSizeBeforeUpdate);
        MedicineGroup testMedicineGroup = medicineGroupList.get(medicineGroupList.size() - 1);
        assertThat(testMedicineGroup.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMedicineGroup.getDescriptions()).isEqualTo(UPDATED_DESCRIPTIONS);
    }

    @Test
    @Transactional
    public void updateNonExistingMedicineGroup() throws Exception {
        int databaseSizeBeforeUpdate = medicineGroupRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedicineGroupMockMvc.perform(put("/api/medicine-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicineGroup)))
            .andExpect(status().isBadRequest());

        // Validate the MedicineGroup in the database
        List<MedicineGroup> medicineGroupList = medicineGroupRepository.findAll();
        assertThat(medicineGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMedicineGroup() throws Exception {
        // Initialize the database
        medicineGroupRepository.saveAndFlush(medicineGroup);

        int databaseSizeBeforeDelete = medicineGroupRepository.findAll().size();

        // Delete the medicineGroup
        restMedicineGroupMockMvc.perform(delete("/api/medicine-groups/{id}", medicineGroup.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MedicineGroup> medicineGroupList = medicineGroupRepository.findAll();
        assertThat(medicineGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
