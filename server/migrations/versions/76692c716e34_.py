"""empty message

Revision ID: 76692c716e34
Revises: 3ea2afc736cf
Create Date: 2019-12-05 15:28:00.171474

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '76692c716e34'
down_revision = '3ea2afc736cf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('steps_prospects',
    sa.Column('step_id', sa.Integer(), nullable=True),
    sa.Column('prospect_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['prospect_id'], ['prospects.id'], ),
    sa.ForeignKeyConstraint(['step_id'], ['steps.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('steps_prospects')
    # ### end Alembic commands ###
