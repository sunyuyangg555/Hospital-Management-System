package at.jiffy.hms.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import at.jiffy.hms.web.rest.TestUtil;

public class AdmissionVisitTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AdmissionVisit.class);
        AdmissionVisit admissionVisit1 = new AdmissionVisit();
        admissionVisit1.setId(1L);
        AdmissionVisit admissionVisit2 = new AdmissionVisit();
        admissionVisit2.setId(admissionVisit1.getId());
        assertThat(admissionVisit1).isEqualTo(admissionVisit2);
        admissionVisit2.setId(2L);
        assertThat(admissionVisit1).isNotEqualTo(admissionVisit2);
        admissionVisit1.setId(null);
        assertThat(admissionVisit1).isNotEqualTo(admissionVisit2);
    }
}
