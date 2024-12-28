"""Change to user info

Revision ID: 6262eac1c62c
Revises: d891b60d31b3
Create Date: 2024-12-28 10:27:54.889539

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '6262eac1c62c'
down_revision = 'd891b60d31b3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_info', schema=None) as batch_op:
        batch_op.add_column(sa.Column('age', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('gender', sa.Enum('MALE', 'FEMALE', 'OTHER', name='gender'), nullable=True))
        batch_op.add_column(sa.Column('height', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('weight', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('activity_level', sa.Enum('SEDENTARY', 'LIGHT', 'MODERATE', 'VERY_ACTIVE', name='activitylevel'), nullable=True))
        batch_op.add_column(sa.Column('fitness_level', sa.Enum('BEGINNER', 'INTERMEDIATE', 'ADVANCED', name='fitnesslevel'), nullable=True))
        batch_op.add_column(sa.Column('weight_goal', sa.Enum('LOSE', 'MAINTAIN', 'GAIN', name='weightgoal'), nullable=True))
        batch_op.drop_column('notification_enabled')
        batch_op.drop_column('theme')

    with op.batch_alter_table('user_settings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('metric_type', sa.Enum('METRIC', 'IMPERIAL', name='metrictype'), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_settings', schema=None) as batch_op:
        batch_op.drop_column('metric_type')

    with op.batch_alter_table('user_info', schema=None) as batch_op:
        batch_op.add_column(sa.Column('theme', mysql.VARCHAR(length=20), nullable=True))
        batch_op.add_column(sa.Column('notification_enabled', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True))
        batch_op.drop_column('weight_goal')
        batch_op.drop_column('fitness_level')
        batch_op.drop_column('activity_level')
        batch_op.drop_column('weight')
        batch_op.drop_column('height')
        batch_op.drop_column('gender')
        batch_op.drop_column('age')

    # ### end Alembic commands ###
