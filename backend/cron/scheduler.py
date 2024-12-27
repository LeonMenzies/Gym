from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from apscheduler.triggers.cron import CronTrigger
from flask import Flask
from helpers.api_exception import ApiException
from cron import jobs 

scheduler = None

def create_scheduler(app: Flask, db):
    global scheduler

    jobstores = {
        'default': SQLAlchemyJobStore(url=app.config['SQLALCHEMY_DATABASE_URI'], engine=db.engine)
    }
    scheduler = BackgroundScheduler(jobstores=jobstores)
    scheduler.start()

    
    return scheduler

def trigger_job(job_id):
    global scheduler 

    job = scheduler.get_job(job_id)
    if job:
        job.func()
    else:
        raise ApiException(f"Job {job_id} not found")