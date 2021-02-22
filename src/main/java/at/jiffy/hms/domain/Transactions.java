package at.jiffy.hms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Transactions.
 */
@Entity
@Table(name = "transactions")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Transactions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "currency_code", nullable = false)
    private String currencyCode;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Double amount;

    @NotNull
    @Column(name = "is_reversed", nullable = false)
    private Boolean isReversed;

    @NotNull
    @Column(name = "transaction_date", nullable = false)
    private LocalDate transactionDate;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "transcations", allowSetters = true)
    private MedicalService medicalService;

    @ManyToOne
    @JsonIgnoreProperties(value = "transactions", allowSetters = true)
    private Department department;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "transactions", allowSetters = true)
    private ConsultationResource consultation;

    @ManyToOne
    @JsonIgnoreProperties(value = "transactions", allowSetters = true)
    private Medicine medicine;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public Transactions currencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
        return this;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public Double getAmount() {
        return amount;
    }

    public Transactions amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Boolean isIsReversed() {
        return isReversed;
    }

    public Transactions isReversed(Boolean isReversed) {
        this.isReversed = isReversed;
        return this;
    }

    public void setIsReversed(Boolean isReversed) {
        this.isReversed = isReversed;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public Transactions transactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
        return this;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public MedicalService getMedicalService() {
        return medicalService;
    }

    public Transactions medicalService(MedicalService medicalService) {
        this.medicalService = medicalService;
        return this;
    }

    public void setMedicalService(MedicalService medicalService) {
        this.medicalService = medicalService;
    }

    public Department getDepartment() {
        return department;
    }

    public Transactions department(Department department) {
        this.department = department;
        return this;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public ConsultationResource getConsultation() {
        return consultation;
    }

    public Transactions consultation(ConsultationResource consultationResource) {
        this.consultation = consultationResource;
        return this;
    }

    public void setConsultation(ConsultationResource consultationResource) {
        this.consultation = consultationResource;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public Transactions medicine(Medicine medicine) {
        this.medicine = medicine;
        return this;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transactions)) {
            return false;
        }
        return id != null && id.equals(((Transactions) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Transactions{" +
            "id=" + getId() +
            ", currencyCode='" + getCurrencyCode() + "'" +
            ", amount=" + getAmount() +
            ", isReversed='" + isIsReversed() + "'" +
            ", transactionDate='" + getTransactionDate() + "'" +
            "}";
    }
}
