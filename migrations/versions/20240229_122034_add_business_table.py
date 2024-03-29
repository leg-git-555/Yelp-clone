"""add business table

Revision ID: a0204a2393c6
Revises: 7c83d40826ca
Create Date: 2024-02-29 12:20:34.172910

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a0204a2393c6'
down_revision = '7c83d40826ca'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('businesses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('address', sa.String(length=100), nullable=False),
    sa.Column('city', sa.String(length=50), nullable=False),
    sa.Column('state', sa.String(length=50), nullable=False),
    sa.Column('country', sa.String(length=50), nullable=False),
    sa.Column('category', sa.String(length=50), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('businesses')
    # ### end Alembic commands ###
