package at.jiffy.hms.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import at.jiffy.hms.web.rest.TestUtil;

public class MeasurementUnitTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MeasurementUnit.class);
        MeasurementUnit measurementUnit1 = new MeasurementUnit();
        measurementUnit1.setId(1L);
        MeasurementUnit measurementUnit2 = new MeasurementUnit();
        measurementUnit2.setId(measurementUnit1.getId());
        assertThat(measurementUnit1).isEqualTo(measurementUnit2);
        measurementUnit2.setId(2L);
        assertThat(measurementUnit1).isNotEqualTo(measurementUnit2);
        measurementUnit1.setId(null);
        assertThat(measurementUnit1).isNotEqualTo(measurementUnit2);
    }
}
