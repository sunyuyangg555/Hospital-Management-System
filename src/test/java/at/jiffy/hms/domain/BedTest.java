package at.jiffy.hms.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import at.jiffy.hms.web.rest.TestUtil;

public class BedTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bed.class);
        Bed bed1 = new Bed();
        bed1.setId(1L);
        Bed bed2 = new Bed();
        bed2.setId(bed1.getId());
        assertThat(bed1).isEqualTo(bed2);
        bed2.setId(2L);
        assertThat(bed1).isNotEqualTo(bed2);
        bed1.setId(null);
        assertThat(bed1).isNotEqualTo(bed2);
    }
}
