package at.jiffy.hms.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import at.jiffy.hms.web.rest.TestUtil;

public class ConsultationResourceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConsultationResource.class);
        ConsultationResource consultationResource1 = new ConsultationResource();
        consultationResource1.setId(1L);
        ConsultationResource consultationResource2 = new ConsultationResource();
        consultationResource2.setId(consultationResource1.getId());
        assertThat(consultationResource1).isEqualTo(consultationResource2);
        consultationResource2.setId(2L);
        assertThat(consultationResource1).isNotEqualTo(consultationResource2);
        consultationResource1.setId(null);
        assertThat(consultationResource1).isNotEqualTo(consultationResource2);
    }
}
