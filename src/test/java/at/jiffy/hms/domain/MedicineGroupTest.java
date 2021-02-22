package at.jiffy.hms.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import at.jiffy.hms.web.rest.TestUtil;

public class MedicineGroupTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedicineGroup.class);
        MedicineGroup medicineGroup1 = new MedicineGroup();
        medicineGroup1.setId(1L);
        MedicineGroup medicineGroup2 = new MedicineGroup();
        medicineGroup2.setId(medicineGroup1.getId());
        assertThat(medicineGroup1).isEqualTo(medicineGroup2);
        medicineGroup2.setId(2L);
        assertThat(medicineGroup1).isNotEqualTo(medicineGroup2);
        medicineGroup1.setId(null);
        assertThat(medicineGroup1).isNotEqualTo(medicineGroup2);
    }
}
