def test_organization_model_instantiation():
    from app.domain.organizations.models import Organization
    org = Organization(id="ORG-01", name="Ethiopian Ministry of Health", code="MOH-ETH")
    assert org.id == "ORG-01"
    assert org.name == "Ethiopian Ministry of Health"

def test_facility_model_instantiation():
    from app.domain.facilities.models import Facility
    fac = Facility(id="FAC-01", name="Kagoro Health Post", woreda="Kagoro", region="Oromia")
    assert fac.woreda == "Kagoro"

def test_practitioner_model_instantiation():
    from app.domain.practitioners.models import Practitioner
    prac = Practitioner(id="PRAC-01", name="Tigist Alemu", role="HEW")
    assert prac.role == "HEW"
