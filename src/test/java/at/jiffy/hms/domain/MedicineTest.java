package at.jiffy.hms.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import at.jiffy.hms.web.rest.TestUtil;

public class MedicineTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Medicine.class);
        Medicine medicine1 = new Medicine();
        medicine1.setId(1L);
        Medicine medicine2 = new Medicine();
        medicine2.setId(medicine1.getId());
        assertThat(medicine1).isEqualTo(medicine2);
        medicine2.setId(2L);
        assertThat(medicine1).isNotEqualTo(medicine2);
        medicine1.setId(null);
        assertThat(medicine1).isNotEqualTo(medicine2);
    }
}
