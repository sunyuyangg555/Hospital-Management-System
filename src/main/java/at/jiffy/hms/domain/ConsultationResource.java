package at.jiffy.hms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * 会诊
 */
@ApiModel(description = "会诊")
@Entity
@Table(name = "consultation_resource")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ConsultationResource implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "fromdate", nullable = false)
    private LocalDate fromdate;

    @NotNull
    @Column(name = "todate", nullable = false)
    private LocalDate todate;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "is_admitted")
    private Boolean isAdmitted;

    @OneToMany(mappedBy = "service")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Diagnosis> diagnoses = new HashSet<>();

    @OneToMany(mappedBy = "service")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Admission> admissions = new HashSet<>();

    @OneToMany(mappedBy = "consultation")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Transactions> transactions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "services", allowSetters = true)
    private Staff staff;

    @ManyToOne
    @JsonIgnoreProperties(value = "consulatationResources", allowSetters = true)
    private Patient patient;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFromdate() {
        return fromdate;
    }

    public ConsultationResource fromdate(LocalDate fromdate) {
        this.fromdate = fromdate;
        return this;
    }

    public void setFromdate(LocalDate fromdate) {
        this.fromdate = fromdate;
    }

    public LocalDate getTodate() {
        return todate;
    }

    public ConsultationResource todate(LocalDate todate) {
        this.todate = todate;
        return this;
    }

    public void setTodate(LocalDate todate) {
        this.todate = todate;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public ConsultationResource isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Boolean isIsAdmitted() {
        return isAdmitted;
    }

    public ConsultationResource isAdmitted(Boolean isAdmitted) {
        this.isAdmitted = isAdmitted;
        return this;
    }

    public void setIsAdmitted(Boolean isAdmitted) {
        this.isAdmitted = isAdmitted;
    }

    public Set<Diagnosis> getDiagnoses() {
        return diagnoses;
    }

    public ConsultationResource diagnoses(Set<Diagnosis> diagnoses) {
        this.diagnoses = diagnoses;
        return this;
    }

    public ConsultationResource addDiagnoses(Diagnosis diagnosis) {
        this.diagnoses.add(diagnosis);
        diagnosis.setService(this);
        return this;
    }

    public ConsultationResource removeDiagnoses(Diagnosis diagnosis) {
        this.diagnoses.remove(diagnosis);
        diagnosis.setService(null);
        return this;
    }

    public void setDiagnoses(Set<Diagnosis> diagnoses) {
        this.diagnoses = diagnoses;
    }

    public Set<Admission> getAdmissions() {
        return admissions;
    }

    public ConsultationResource admissions(Set<Admission> admissions) {
        this.admissions = admissions;
        return this;
    }

    public ConsultationResource addAdmissions(Admission admission) {
        this.admissions.add(admission);
        admission.setService(this);
        return this;
    }

    public ConsultationResource removeAdmissions(Admission admission) {
        this.admissions.remove(admission);
        admission.setService(null);
        return this;
    }

    public void setAdmissions(Set<Admission> admissions) {
        this.admissions = admissions;
    }

    public Set<Transactions> getTransactions() {
        return transactions;
    }

    public ConsultationResource transactions(Set<Transactions> transactions) {
        this.transactions = transactions;
        return this;
    }

    public ConsultationResource addTransactions(Transactions transactions) {
        this.transactions.add(transactions);
        transactions.setConsultation(this);
        return this;
    }

    public ConsultationResource removeTransactions(Transactions transactions) {
        this.transactions.remove(transactions);
        transactions.setConsultation(null);
        return this;
    }

    public void setTransactions(Set<Transactions> transactions) {
        this.transactions = transactions;
    }

    public Staff getStaff() {
        return staff;
    }

    public ConsultationResource staff(Staff staff) {
        this.staff = staff;
        return this;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }

    public Patient getPatient() {
        return patient;
    }

    public ConsultationResource patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ConsultationResource)) {
            return false;
        }
        return id != null && id.equals(((ConsultationResource) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ConsultationResource{" +
            "id=" + getId() +
            ", fromdate='" + getFromdate() + "'" +
            ", todate='" + getTodate() + "'" +
            ", isActive='" + isIsActive() + "'" +
            ", isAdmitted='" + isIsAdmitted() + "'" +
            "}";
    }
}
