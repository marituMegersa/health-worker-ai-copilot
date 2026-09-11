import pytest

def test_clean_architecture_module_imports():
    from app.core.config import settings
    from app.core.database import Base
    assert settings.PROJECT_NAME is not None
    assert Base is not None
