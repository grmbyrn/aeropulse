"""Environment smoke checks. Replace with real tests as the app grows."""


def test_core_dependencies_import():
    import fastapi  # noqa: F401
    import httpx  # noqa: F401
    import pydantic_settings  # noqa: F401
    import sqlalchemy  # noqa: F401
