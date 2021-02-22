package at.jiffy.hms.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import at.jiffy.hms.web.rest.TestUtil;

public class AdmissionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Admission.class);
        Admission admission1 = new Admission();
        admission1.setId(1L);
        Admission admission2 = new Admission();
        admission2.setId(admission1.getId());
        assertThat(admission1).isEqualTo(admission2);
        admission2.setId(2L);
        assertThat(admission1).isNotEqualTo(admission2);
        admission1.setId(null);
        assertThat(admission1).isNotEqualTo(admission2);
    }
}
