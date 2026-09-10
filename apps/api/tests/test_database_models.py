def test_database_models_export():
    from app.db.models import Base
    assert Base is not None
