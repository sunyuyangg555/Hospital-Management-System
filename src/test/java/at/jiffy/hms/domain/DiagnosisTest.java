package at.jiffy.hms.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import at.jiffy.hms.web.rest.TestUtil;

public class DiagnosisTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Diagnosis.class);
        Diagnosis diagnosis1 = new Diagnosis();
        diagnosis1.setId(1L);
        Diagnosis diagnosis2 = new Diagnosis();
        diagnosis2.setId(diagnosis1.getId());
        assertThat(diagnosis1).isEqualTo(diagnosis2);
        diagnosis2.setId(2L);
        assertThat(diagnosis1).isNotEqualTo(diagnosis2);
        diagnosis1.setId(null);
        assertThat(diagnosis1).isNotEqualTo(diagnosis2);
    }
}
