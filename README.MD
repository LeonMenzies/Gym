## Deployment

### Database Migration

flask db migrate -m "Message"
flask db upgrade

### Build Expo App

eas build

### Usefull

sudo journalctl -u gunicorn-gym -n 50 --no-pager

eas build --platform ios --profile production
eas submit -p ios --latest

eas update --branch production

### Backend Deployment

1. **SSH into the server, navigate to the backend directory, and pull the latest code**:

    ```sh
    ssh leon@172.234.196.74
    cd /var/www/Gym/backend
    git pull origin main
    ```

2. **Activate virtual environment, install dependencies, reload systemd daemon, and restart Gunicorn**:
    ```sh
    source venv/bin/activate
    pip install -r requirements.txt
    sudo systemctl daemon-reload
    sudo systemctl restart gunicorn-macro-dash
    ```
