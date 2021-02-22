package at.jiffy.hms.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import at.jiffy.hms.web.rest.TestUtil;

public class MedicineCategoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedicineCategory.class);
        MedicineCategory medicineCategory1 = new MedicineCategory();
        medicineCategory1.setId(1L);
        MedicineCategory medicineCategory2 = new MedicineCategory();
        medicineCategory2.setId(medicineCategory1.getId());
        assertThat(medicineCategory1).isEqualTo(medicineCategory2);
        medicineCategory2.setId(2L);
        assertThat(medicineCategory1).isNotEqualTo(medicineCategory2);
        medicineCategory1.setId(null);
        assertThat(medicineCategory1).isNotEqualTo(medicineCategory2);
    }
}
