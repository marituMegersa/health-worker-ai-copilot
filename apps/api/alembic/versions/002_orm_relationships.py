"""Add ORM relationships and foreign key indices

Revision ID: 002_orm_relationships
Revises: 001_initial_schema
Create Date: 2026-09-11 08:30:00.000000

"""
from alembic import op
import sqlalchemy as sa

revision = '002_orm_relationships'
down_revision = '001_initial_schema'
branch_labels = None
depends_on = None

def upgrade():
    op.create_index('ix_facilities_org_id', 'facilities', ['organization_id'], unique=False)
    op.create_index('ix_practitioners_facility_id', 'practitioners', ['facility_id'], unique=False)

def downgrade():
    op.drop_index('ix_practitioners_facility_id', table_name='practitioners')
    op.drop_index('ix_facilities_org_id', table_name='facilities')
