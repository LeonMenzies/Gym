import os
import sys

# Add backend directory to path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

from __init__ import create_app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4001, debug=True)