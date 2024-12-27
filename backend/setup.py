from setuptools import setup, find_packages

setup(
    name="backend",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'flask',
        'flask-cors',
        'flask-jwt-extended',
        'flask-migrate',
        'flask-sqlalchemy',
        'python-dotenv',
        'PyMySQL',
        'apscheduler'
    ]
)
