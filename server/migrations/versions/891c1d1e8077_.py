"""empty message

Revision ID: 891c1d1e8077
Revises: 6a7d85c1aa50
Create Date: 2019-11-20 22:59:28.800407

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '891c1d1e8077'
down_revision = '6a7d85c1aa50'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('gmail_credentials', sa.Column('user_gmail_credentials', sa.PickleType(), nullable=False))
    op.add_column('gmail_credentials', sa.Column('user_gmail_id', sa.String(length=120), nullable=False))
    op.drop_constraint('gmail_credentials_gmail_user_id_key', 'gmail_credentials', type_='unique')
    op.create_unique_constraint(None, 'gmail_credentials', ['user_gmail_id'])
    op.drop_column('gmail_credentials', 'gmail_credentials')
    op.drop_column('gmail_credentials', 'gmail_user_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('gmail_credentials', sa.Column('gmail_user_id', sa.VARCHAR(length=120), autoincrement=False, nullable=False))
    op.add_column('gmail_credentials', sa.Column('gmail_credentials', postgresql.BYTEA(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'gmail_credentials', type_='unique')
    op.create_unique_constraint('gmail_credentials_gmail_user_id_key', 'gmail_credentials', ['gmail_user_id'])
    op.drop_column('gmail_credentials', 'user_gmail_id')
    op.drop_column('gmail_credentials', 'user_gmail_credentials')
    # ### end Alembic commands ###