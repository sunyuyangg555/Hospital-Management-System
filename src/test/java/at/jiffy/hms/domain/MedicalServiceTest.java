package at.jiffy.hms.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import at.jiffy.hms.web.rest.TestUtil;

public class MedicalServiceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedicalService.class);
        MedicalService medicalService1 = new MedicalService();
        medicalService1.setId(1L);
        MedicalService medicalService2 = new MedicalService();
        medicalService2.setId(medicalService1.getId());
        assertThat(medicalService1).isEqualTo(medicalService2);
        medicalService2.setId(2L);
        assertThat(medicalService1).isNotEqualTo(medicalService2);
        medicalService1.setId(null);
        assertThat(medicalService1).isNotEqualTo(medicalService2);
    }
}
